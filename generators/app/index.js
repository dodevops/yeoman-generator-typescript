const Generator = require('yeoman-generator')
const gitRemoteOriginUrl = require('git-remote-origin-url')

module.exports = class extends Generator {

  constructor (args, options) {
    super(args, options)
    this._props = {}
  }

  prompting () {
    return gitRemoteOriginUrl()
      .then(
        repository => {
          this._props.repository = repository
        },
        error => {
          this._props.repository = ''
        }
      )
      .then(
        () => {
          return this.prompt([
            {
              type: 'input',
              name: 'name',
              message: 'Your project name',
              default: this.appname
            },
            {
              type: 'input',
              name: 'description',
              message: 'A description for your project',
              default: 'My cool Typescript project'
            },
            {
              type: 'input',
              name: 'version',
              message: 'The semver version of the project',
              default: '1.0.0'
            },
            {
              type: 'input',
              name: 'author_name',
              message: 'The name of the author',
              default: this.user.git.name()
            },
            {
              type: 'input',
              name: 'author_email',
              message: 'The email of the author',
              default: this.user.git.email()
            },
            {
              type: 'input',
              name: 'license',
              message: 'License',
              default: 'MIT'
            },
            {
              type: 'input',
              name: 'repository',
              message: 'Code repository',
              default: this._props.repository
            },
            {
              type: 'input',
              name: 'keywords',
              message: 'Keywords that describe your module (separated by ,)',
              filter: value => {
                return JSON.stringify(value.split(/,/))
              }
            },
            {
              type: 'confirm',
              name: 'promise',
              message: 'Do you want to work with promises?',
              default: true
            },
            {
              type: 'confirm',
              name: 'typedoc',
              message: 'Do you want automatic code documentation using typedoc?',
              default: true
            }
          ])
        }
      )
      .then(
        answers => {
          this._props = answers
        }
      )
  }

  installProdDependencies () {
    this.log('Setting up dependencies')
    let pkgs = [
      'loglevel'
    ]
    if (this._props.promise) {
      pkgs.push('bluebird')
    }
    this.npmInstall(
      pkgs,
      {
        'save': true
      }
    )
  }

  installDevDependencies () {
    this.log('Setting up dev dependencies')
    let pkgs = [
      "@types/node",
      "@types/chai",
      "@types/mocha",
      "@types/loglevel",
      "chai",
      "grunt",
      "grunt-ts",
      "grunt-tslint",
      "grunt-mocha-test",
      "mocha",
      "tslint",
      "typescript",
      "grunt-contrib-clean",
      "grunt-contrib-copy",
      "grunt-istanbul",
      "remap-istanbul",
      "tslint-config-standard"
    ]
    if (this._props.promise) {
      pkgs.push(
        '@types/bluebird',
        'chai-as-promised',
        '@types/chai-as-promised'
      )
    }
    if (this._props.typedoc) {
      pkgs.push(
        'grunt-typedoc',
        'typedoc',
        'typedoc-plugin-external-module-map'
      )
    }
    this.npmInstall(
      pkgs,
      {
        'save-dev': true
      }
    )
  }

  writing () {
    this.log('Creating package.json')
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath('package.json'),
      this._props
    )
    this.log('Creating index.ts')
    this.fs.copyTpl(
      this.templatePath('index.ts.ejs'),
      this.destinationPath('index.ts'),
      this._props
    )
    this.log('Creating Gruntfile.js')
    this.fs.copyTpl(
      this.templatePath('Gruntfile.js.ejs'),
      this.destinationPath('Gruntfile.js'),
      this._props
    )
    this.log('Creating Testsuite ModuleTest.ts')
    this.fs.copyTpl(
      this.templatePath('ModuleTest.ts.ejs'),
      this.destinationPath('test/ModuleTest.ts'),
      this._props
    )
    this.log('Creating README.md')
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      this._props
    )
    this.log('Copying static files')
    this.fs.copy(
      this.templatePath('static/*'),
      this.destinationPath()
    )
    this.fs.copyTpl(
      this.templatePath('gitignore.ejs'),
      this.destinationPath('.gitignore')
    )
  }

  end () {
    this.log('I finished generating your new module. Have fun with it!')
    this.log(
      'An example code file was created as index.ts. The module expects library modules in a folder called "lib".'
    )
  }
}
