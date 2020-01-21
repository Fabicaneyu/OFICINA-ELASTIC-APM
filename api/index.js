'use strict';

const apm = require('./apm-agent'); // sempre vir antes de tudo, no começo 
const logger = require('./logging'); // gera um arquivo de texto com os logs  

const Hapi = require('@hapi/hapi'); //iniciou um servidor 
const uuid = require(`uuid`);

const init = async () => {
  const server = Hapi.server({
    port: 3000, 
    host: 'localhost',
    routes: {
      cors: { origin: ['*'],
              additionalHeaders: [
              'Access-Control-Allow-Origin',
              'Access-Control-Request-Method',
              'Allow-Origin',
              'Origin',
              'access-control-allow-origin',
              'access-control-request-method',
              'allow-origin',
              'origin',
              'Accept',
              "Authorization",
              "Content-Type",
              "If-None-Match",
              "Accept-language"
          ]
        }
      }
  });

  server.route([ //2 rotas Get
    {
      method: 'GET',
      path: '/hello',
      handler: (request, h) => { //handler configura a resposta, trata a resposta dentro do handler 
        const correlationId = request.headers['x-correlation-id'] || uuid.v4();
        logger.log({ //já trata o log dentro da resposta 
          level: 'info',
          message: `Hello said here with context: ${request.uuid}`,
          meta: { 'correlation-id': correlationId, path: request.path, method: request.method }
        });
        apm.addLabels({ 'request-url': '/byebye' });
        apm.setUserContext({
        id: correlationId,
        username: 'test-user',
        email: 'test-user@rapido.bike',
});

        return h.response('Hello World =]')
                .header('Access-Control-Allow-Origin', 'http://localhost:4200')
                .header('x-correlation-id', correlationId)
                .header('origin', 'http://localhost:4200');
      },
    },
    {
      method: 'GET',
      path: '/byebye',
      handler: (request, h) => {
        const correlationId = request.headers['x-correlation-id'] || uuid.v4();
        return h.response('Bye bye *-*')
                .header('Access-Control-Allow-Origin', 'http://localhost:4200')
                .header('x-correlation-id', correlationId)
                .header('origin', 'http://localhost:4200');
      }
    },
  ]);

  await server.start(); //start do serviço,
  logger.log({
    level: 'info',
    message: `Server running on  ${server.info.uri}`,
    meta: { server: server.info.uri },
  });
};


process.on('unhandledRejection', (err) => {
  logger.log({
    level: 'error',
    message: err,
  });

  process.exit(1);
});

init();
