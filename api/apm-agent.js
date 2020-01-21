const apmNode = require('elastic-apm-node').start({
  serviceName: 'node-app',
  secretToken: 'ZfVHp79CkJW0mxLlwC',
  serverUrl: 'https://4d458b255b50424a8409932348d0cdb4.apm.us-east-1.aws.cloud.es.io',
  logLevel: 'trace',  //pode ser alterado traz mais informações ou pode ser info, determina o tipo do que será retornado  
  serviceVersion: '0.1',
  distributedTracingOrigins: ['http://localhost:4200'], //serviço do angular que chama a api 
  captureBody: true, //corpo da rresposta numa requisição 
  captureHeaders: true, // informações do cabeçalho da minha requisição 
  captureErrorLogStackTraces: 'always', //qdo vc ñ tem acesso ao trace do erro, aqui indica que mande 5primeiras linhas do código
  usePathAsTransactionName: true, //poe a informação no monitoramento 
  sourceLinesErrorAppFrames: 5
});

module.exports = apmNode;