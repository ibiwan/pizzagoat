const assert = require('assert');

const makeFakeFunction = require('../../../utility/makeFakeFunction');
const makeTeamEntity = require('../../../../src/entities/team');

describe('creates a team and initializes it from one string', () => {
  const name = 'dudesname';
  let input;
  let team;
  let actualOutput;
  let expectedOutput;
  let hireDeliverer;

  before(() => {
    input = 'abc';

    const deliverer = makeFakeFunction(() => input.split(''));
    hireDeliverer = makeFakeFunction(() => deliverer);
    const { hireTeam } = makeTeamEntity({
      delivererEntity: { hireDeliverer },
    });

    team = hireTeam(name);

    actualOutput = team(input);
    expectedOutput = input.length;
  });

  it('calls hireDeliverer for given name', () => {
    hireDeliverer.assertCalledOnceWithDeep([name, 0]);
  });

  it('returns the expected number of houses visited', () => {
    assert.strictEqual(actualOutput, expectedOutput);
  });
});

describe('creates a team and initializes it from an array of names', () => {
  const names = ['dudesname', 'ladysname'];
  let input;
  let team;
  let actualOutput;
  let expectedOutput;
  let hireDeliverer;

  before(() => {
    input = 'abc';

    const houseSet1 = { a: true, b: true, c: true };
    const houseSet2 = { c: true, d: true, e: true };
    expectedOutput = 5;

    const deliverers = [
      makeFakeFunction(() => houseSet1),
      makeFakeFunction(() => houseSet2),
    ];

    hireDeliverer = makeFakeFunction((name, i) => deliverers[i]);
    const { hireTeam } = makeTeamEntity({
      delivererEntity: { hireDeliverer },
    });

    team = hireTeam(names);

    actualOutput = team(input);
  });

  it('calls hireDeliverer for given name', () => {
    for (let i = 0; i < names.length; i += 1) {
      hireDeliverer.assertCalledWithExactly({
        callNum: i,
        args: [names[i], i],
      });
    }
  });

  it('returns the expected number of houses visited', () => {
    assert.strictEqual(actualOutput, expectedOutput);
  });
});
