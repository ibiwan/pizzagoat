const assert = require('assert');
const makeDecoderUtility = require('../../../../src/utilities/decoder');

describe('decodes a string with extra chars', () => {
  let input;
  let actualOutput;
  let expectedOutput;

  before(() => {
    input = '12345%^&*(VV<<><vbv';

    expectedOutput = [
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: -1 }, // ^
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 0 }, // ignore
      { x: -1, y: 0 }, // <
      { x: -1, y: 0 }, // <
      { x: 1, y: 0 }, // >
      { x: -1, y: 0 }, // <
      { x: 0, y: 1 }, // v
      { x: 0, y: 0 }, // ignore
      { x: 0, y: 1 }, // v
    ];

    const { decodeInstruction } = makeDecoderUtility();
    actualOutput = input.split('').map(decodeInstruction);
  });

  it('returns moves matching the valid chars plus no-ops for invalid', () => {
    assert.deepStrictEqual(actualOutput, expectedOutput);
  });
});
