var ruleTestBase = require('../rule-test-base.js');
var rule = require('../../../dist/rules/required-feature-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'No tag found matching <%= tags %> for <%= nodeType %>');

describe('Required Feature Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('required-feature-tags/NoViolations.feature', {
      'featureTags': [ '@requiredfeaturetag' ]
    }, []);
  });
  it('detects errors for Features', () => {
    return runTest('required-tags/Violations.feature', {
      'featureTags': [ '@requiredfeaturetag' ]
    }, [{
      messageElements: {tags: '@requiredfeaturetag', nodeType: 'Feature'},
      line: 1
    }]);
  });

  it('detects errors for Features with a regex', () => {
    return runTest('required-tags/Violations.feature', {
      'featureTags': [ '(@requiredfeaturetag|@anothertag)' ]
    }, [{
      messageElements: {tags: '(@requiredfeaturetag|@anothertag)', nodeType: 'Feature'},
      line: 1
    }]);
  });
});
