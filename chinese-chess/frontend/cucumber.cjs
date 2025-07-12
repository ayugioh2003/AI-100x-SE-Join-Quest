module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: ['features/step-definitions/**/*.js'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};