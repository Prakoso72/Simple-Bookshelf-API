const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  server.start();
  console.log(`Server runing on ${server.info.uri}`);
};

init();
