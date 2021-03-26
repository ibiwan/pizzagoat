const { RESOLVER } = require('awilix');

const decoderUtility = () => {
  const decodeInstruction = (code) => {
    switch (code) {
      case '^':
        return { x: 0, y: -1 };
      case 'v':
        return { x: 0, y: 1 };
      case '<':
        return { x: -1, y: 0 };
      case '>':
        return { x: 1, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  return {
    decodeInstruction,
  };
};

decoderUtility[RESOLVER] = { name: 'decoderUtility' };

module.exports = decoderUtility;
