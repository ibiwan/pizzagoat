const assert = require('assert');

const makeFakeFunction = require('../../../utility/makeFakeFunction');
const makeDelivererEntity = require('../../../../src/entities/deliverer');

const stringInputs = [
  '>',
  '^>v<',
  '^v^v^v^v^v',
];

for (let i = 0; i < stringInputs.length; i += 1) {
  const input = stringInputs[i];

  describe(`creates a deliverer and instructs it with string ${input}`, () => {
    const decodeInstruction = makeFakeFunction(() => ({ x: 1, y: 1 }));
    let deliverer;
    let actualOutput;
    let expectedOutput;

    before(() => {
      const { hireDeliverer } = makeDelivererEntity({ decoderUtility: { decodeInstruction } });
      deliverer = hireDeliverer('dudesname');
      expectedOutput = {};
      [
        'one extra to start with',
        ...input.split(''),
      ].forEach((char, idx) => {
        expectedOutput[`{"x":${idx},"y":${idx}}`] = true;
      });

      actualOutput = deliverer(input);
    });

    it('calls decodeInstruction for each character', () => {
      for (let j = 0; j < input.length; j += 1) {
        decodeInstruction.calledOnceWithExactly({
          callNum: i,
          args: [input[i]],
        });
      }
    });

    it('returns the expected set of houses visited', () => {
      assert.deepStrictEqual(actualOutput, expectedOutput);
    });
  });
}

describe('creates a deliverer and instructs it with an array of char', () => {});

const arrayInputs = [
  ['>'],
  ['^', '>', 'v', '<'],
  ['^', 'v', '^', 'v', '^', 'a', 'e', 'i', '^', 'v'],
];

for (let i = 0; i < arrayInputs.length; i += 1) {
  const input = arrayInputs[i];

  describe(`creates a deliverer and instructs it with array ${JSON.stringify(input)}`, () => {
    const decodeInstruction = makeFakeFunction(() => ({ x: 1, y: 1 }));
    let deliverer;
    let actualOutput;
    let expectedOutput;

    before(() => {
      const { hireDeliverer } = makeDelivererEntity({ decoderUtility: { decodeInstruction } });
      deliverer = hireDeliverer('dudesname');
      expectedOutput = {};
      [
        'one extra to start with',
        ...input,
      ].forEach((char, idx) => {
        expectedOutput[`{"x":${idx},"y":${idx}}`] = true;
      });

      actualOutput = deliverer(input);
    });

    it('calls decodeInstruction for each character', () => {
      for (let j = 0; j < input.length; j += 1) {
        decodeInstruction.calledOnceWithExactly({
          callNum: i,
          args: [input[i]],
        });
      }
    });

    it('returns the expected set of houses visited', () => {
      assert.deepStrictEqual(actualOutput, expectedOutput);
    });
  });
}
