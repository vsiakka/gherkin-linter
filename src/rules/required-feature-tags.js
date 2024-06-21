const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'required-feature-tags';
const availableConfigs = {
  featureTags: [],
  ignoreUntagged: true
};


function checkFeatureTagExists(requiredTag, ignoreUntagged, scenarioTags) {
  const result = (ignoreUntagged && scenarioTags.length == 0)
    || scenarioTags.some((tagObj) => RegExp(requiredTag).test(tagObj.name));
  if (!result) {
    return {
      message: `No tag found matching ${requiredTag} for Feature`,
      rule,
      line: 1
    };
  }
  return result;
}

function run(feature, unused, config) {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, config);

  let errors = [];

  // Check each Scenario for the required tags
  const requiredTagErrors = mergedConfig.featureTags
    .map((requiredTag) => checkFeatureTagExists(requiredTag, mergedConfig.ignoreUntagged, feature.tags || []))
    .filter((item) =>
      typeof item === 'object' && item.message
    );

  // Update errors
  errors = errors.concat(requiredTagErrors);

  return errors;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
