// import Fastify from 'fastify';
// const fastify = Fastify({
//   logger: true,
// });

const fastify = require('fastify')({
  logger: true,
});

const brokenSchema = require('./broken_schema');
const workingSchema = require('./working_schema'); 

fastify.post(
  '/broken',
  {
    schema: {
      body: brokenSchema,
    },
  },
  (request, reply) => {
    reply.send({ requestType: request.body.definition.type });
  }
);

fastify.post(
  '/working',
  {
    schema: {
      body: workingSchema,
    },
  },
  (request, reply) => {
    reply.send({ requestType: request.body.definition.type });
  }
);

fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
