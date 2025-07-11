module.exports = {
  default: {
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', ['html', 'cucumber-report.html']],
    paths: ['features/*.feature'],
  },
  verbose: {
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'summary', ['html', 'cucumber-report.html']],
    paths: ['features/*.feature'],
  },
}
