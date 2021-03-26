const { RESOLVER } = require('awilix');

const delivererEntity = ({
  decoderUtility: { decodeInstruction },
}) => {
  const hireDeliverer = () => (instructions) => {
    let useInstructions = instructions;
    if (typeof instructions === 'string') {
      useInstructions = instructions.split('');
    }

    const moves = useInstructions.map(
      (instr) => decodeInstruction(instr),
    );

    const position = { x: 0, y: 0 };
    const houses = { [JSON.stringify(position)]: true };
    moves.forEach(({ x, y }) => {
      position.x += x;
      position.y += y;
      houses[JSON.stringify(position)] = true;
    });

    return houses;
  };

  return {
    hireDeliverer,
  };
};

delivererEntity[RESOLVER] = { name: 'delivererEntity' };

module.exports = delivererEntity;
