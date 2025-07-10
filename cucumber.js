module.exports = {
  default: {
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    paths: ['features/*.feature']
  },
  verbose: {
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'summary'],
    paths: ['features/*.feature']
  }
};