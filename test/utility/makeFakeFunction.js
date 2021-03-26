const { assert } = require('chai');
const sinon = require('sinon');

module.exports = (wrapped) => {
  const fake = (wrapped === undefined) ? sinon.fake() : sinon.fake(wrapped);

  fake.assertCalledOnce = (failMessage = '') => {
    assert(fake.calledOnce, failMessage);
  };

  fake.assertCalledOnceWithDeep = (args, failMessage) => {
    assert(fake.calledOnce, `${failMessage} (# calls)`);
    assert.deepEqual(fake.args[0], args, `${failMessage} (arguments)`);
  };

  fake.assertCalledWithExactly = ({ callNum = 0, args = [] }, failMessage = '') => {
    assert.deepEqual(fake.getCall(callNum).args, args, failMessage);
  };

  fake.assertNeverCalled = (failMessage = '') => {
    assert.equal(fake.callCount, 0, failMessage);
  };

  return fake;
};
