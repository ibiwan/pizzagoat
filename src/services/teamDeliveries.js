const { RESOLVER } = require('awilix');

const teamDeliveriesService = ({
  teamEntity: { hireTeam },
}) => {
  const computeTeamDeliveries = (names, instructions) => {
    const team = hireTeam(names);
    const n = team(instructions);

    return n;
  };

  return {
    computeTeamDeliveries,
  };
};

teamDeliveriesService[RESOLVER] = { name: 'teamDeliveriesService' };

module.exports = teamDeliveriesService;
