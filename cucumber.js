module.exports = {
  default: {
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:cucumber-report.json'],
    paths: ['features/*.feature']
  }
};