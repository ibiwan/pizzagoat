const { RESOLVER } = require('awilix');

const teamDeliveriesController = ({
  teamDeliveriesService: { computeTeamDeliveries },
}) => {
  const handleGetTeamDeliveries = (req, res) => {
    const { query: { name: names, instructions } } = req;

    const result = computeTeamDeliveries(names, instructions);

    res.send({ n: result });
  };

  const handlePostTeamDeliveries = (req, res) => {
    const { body: { names, instructions } } = req;

    const result = computeTeamDeliveries(names, instructions);

    res.send({ n: result });
  };

  return {
    handleGetTeamDeliveries,
    handlePostTeamDeliveries,
  };
};

teamDeliveriesController[RESOLVER] = { name: 'teamDeliveriesController' };

module.exports = teamDeliveriesController;
