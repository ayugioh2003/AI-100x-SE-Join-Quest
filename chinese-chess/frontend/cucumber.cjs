module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    tags: 'not @ignore'
  }
};