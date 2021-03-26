const { RESOLVER } = require('awilix');

const restApiService = ({
  express,
  baseRouter,
}) => {
  let server;

  const start = () => {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.use('/', baseRouter);

    server = app.listen(
      port,
      () => {
        console.log(`Example app listening at http://localhost:${port}`);
      },
    );

    return app;
  };

  const stop = () => {
    if (server) {
      server.close();
    }
  };

  return {
    start,
    stop,
  };
};

restApiService[RESOLVER] = { name: 'restApiService' };

module.exports = restApiService;
