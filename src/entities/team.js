const { RESOLVER } = require('awilix');

const teamEntity = ({
  delivererEntity: { hireDeliverer },
}) => {
  const hireTeam = (names) => (instructions) => {
    let useNames = names;

    if (typeof names === 'string') {
      useNames = [names];
    }

    const deliverers = useNames.map((name, i) => hireDeliverer(name, i));
    const nDeliverers = deliverers.length;

    const instructionSets = instructions.split('').reduce(
      (acc, val, i) => {
        acc[i % nDeliverers].push(val);
        return acc;
      },
      Array(nDeliverers).fill(0).map(() => []),
    );

    const houseSets = deliverers.map(
      (d, i) => d(instructionSets[i]),
    );

    const houses = houseSets.reduce(
      (allHouses, routeHouses) => ({
        ...allHouses,
        ...routeHouses,
      }),
      {},
    );

    const n = Object.keys(houses).length;
    return n;
  };

  return {
    hireTeam,
  };
};

teamEntity[RESOLVER] = { name: 'teamEntity' };

module.exports = teamEntity;
