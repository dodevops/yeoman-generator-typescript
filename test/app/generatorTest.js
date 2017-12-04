let helpers = require('yeoman-test')
let assert = require('yeoman-assert')
let path = require('path')

let answers

function fixAnswers(answers) {
  let returnAnswers = JSON.parse(JSON.stringify(answers))
  delete returnAnswers.promise
  delete returnAnswers.typedoc
  returnAnswers.keywords = JSON.parse(returnAnswers.keywords)
  returnAnswers.author = `${returnAnswers.author_name} <${returnAnswers.author_email}>`
  delete returnAnswers.author_email
  delete returnAnswers.author_name
  returnAnswers.repository = {
    type: 'git',
    url: returnAnswers.repository
  }
  return returnAnswers
}

describe(
  'The generator', () => {
    beforeEach(function () {
      answers = {
        name: 'testname',
        description: 'testdescription',
        version: 'testversion',
        author_name: 'testauthorname',
        author_email: 'testauthoremail',
        license: 'testlicense',
        repository: 'testrepository',
        keywords: JSON.stringify([
          'testkeyword1',
          'testkeyword2'
        ]),
        promise: true,
        typedoc: true
      }
    })

    it('should work with default options', function () {
      return helpers.run(path.join(__dirname, '..', '..', 'generators', 'app'))
        .withPrompts(answers)
        .then(
          () => {
            // test all files
            assert.file(
              [
                'Gruntfile.js',
                '.gitignore',
                'index.ts',
                'package.json',
                'README.md',
                'test/ModuleTest.ts',
                'sonar-project.properties',
                'tsconfig.json',
                'tslint.json'
              ]
            )
            // test correct entries
            assert.jsonFileContent(
              'package.json',
              fixAnswers(answers)
            )
            // test promise support
            assert.fileContent(
              [
                [
                  'index.ts',
                  /Bluebird/
                ],
                [
                  'test/ModuleTest.ts',
                  /chaiAsPromised/
                ]
              ]
            )
            // test typedoc support
            assert.fileContent(
              [
                [
                  'Gruntfile.js',
                  /typedoc/
                ],
                [
                  'Gruntfile.js',
                  /'doc'/
                ],
                [
                  'Gruntfile.js',
                  /'doc',/
                ],
              ]
            )
          }
        )
    })
    it('should work without typedoc', function () {
      answers.typedoc = false
      return helpers.run(path.join(__dirname, '..', '..', 'generators', 'app'))
        .withPrompts(answers)
        .then(
          () => {
            // test all files
            assert.file(
              [
                'Gruntfile.js',
                '.gitignore',
                'index.ts',
                'package.json',
                'README.md',
                'test/ModuleTest.ts',
                'sonar-project.properties',
                'tsconfig.json',
                'tslint.json'
              ]
            )
            // test correct entries
            assert.jsonFileContent(
              'package.json',
              fixAnswers(answers)
            )
            // test promise support
            assert.fileContent(
              [
                [
                  'index.ts',
                  /Bluebird/
                ],
                [
                  'test/ModuleTest.ts',
                  /chaiAsPromised/
                ]
              ]
            )
            // test typedoc support
            assert.noFileContent(
              [
                [
                  'Gruntfile.js',
                  /typedoc/
                ],
                [
                  'Gruntfile.js',
                  /'doc'/
                ],
                [
                  'Gruntfile.js',
                  /'doc',/
                ],
              ]
            )
          }
        )
    })
    it('should work without promises', function () {
      answers.promise = false
      return helpers.run(path.join(__dirname, '..', '..', 'generators', 'app'))
        .withPrompts(answers)
        .then(
          dir => {
            // test all files
            assert.file(
              [
                'Gruntfile.js',
                '.gitignore',
                'index.ts',
                'package.json',
                'README.md',
                'test/ModuleTest.ts',
                'sonar-project.properties',
                'tsconfig.json',
                'tslint.json'
              ]
            )
            // test correct entries
            assert.jsonFileContent(
              'package.json',
              fixAnswers(answers)
            )
            // test promise support
            assert.noFileContent(
              [
                [
                  'index.ts',
                  /Bluebird/
                ],
                [
                  'test/ModuleTest.ts',
                  /chaiAsPromised/
                ]
              ]
            )
            // test typedoc support
            assert.fileContent(
              [
                [
                  'Gruntfile.js',
                  /typedoc/
                ],
                [
                  'Gruntfile.js',
                  /'doc'/
                ],
                [
                  'Gruntfile.js',
                  /'doc',/
                ],
              ]
            )
          }
        )
    })
    it('should work without promise and typedoc', function () {
      answers.promise = false
      answers.typedoc = false
      return helpers.run(path.join(__dirname, '..', '..', 'generators', 'app'))
        .withPrompts(answers)
        .then(
          () => {
            // test all files
            assert.file(
              [
                'Gruntfile.js',
                '.gitignore',
                'index.ts',
                'package.json',
                'README.md',
                'test/ModuleTest.ts',
                'sonar-project.properties',
                'tsconfig.json',
                'tslint.json'
              ]
            )
            // test correct entries
            assert.jsonFileContent(
              'package.json',
              fixAnswers(answers)
            )
            // test promise support
            assert.noFileContent(
              [
                [
                  'index.ts',
                  /Bluebird/
                ],
                [
                  'test/ModuleTest.ts',
                  /chaiAsPromised/
                ]
              ]
            )
            // test typedoc support
            assert.noFileContent(
              [
                [
                  'Gruntfile.js',
                  /typedoc/
                ],
                [
                  'Gruntfile.js',
                  /'doc'/
                ],
                [
                  'Gruntfile.js',
                  /'doc',/
                ],
              ]
            )
          }
        )
    })
  }
)