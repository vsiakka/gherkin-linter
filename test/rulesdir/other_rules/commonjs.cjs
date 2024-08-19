var rule = 'commonjs-custom';

function custom() {
  return [
    {
      message: 'CommonJS custom error',
      rule   : rule,
      line   : 789
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  availableConfigs: []
};
