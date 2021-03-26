const { RESOLVER } = require('awilix');

const teamRouter = ({
  express,
  teamDeliveriesController: {
    handleGetTeamDeliveries,
    handlePostTeamDeliveries,
  },
}) => {
  const router = express.Router();

  router.get('/deliveries', handleGetTeamDeliveries);
  router.post('/deliveries', handlePostTeamDeliveries);

  return router;
};

teamRouter[RESOLVER] = { name: 'teamRouter' };

module.exports = teamRouter;
