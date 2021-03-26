const { RESOLVER } = require('awilix');

const baseRouter = ({
  express,
  teamRouter,
}) => {
  const router = express.Router();

  router.use('/team', teamRouter);

  return router;
};

baseRouter[RESOLVER] = { name: 'baseRouter' };

module.exports = baseRouter;
