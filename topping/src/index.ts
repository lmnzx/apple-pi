import fastify from "fastify";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: true,
        ignore: "pid,hostname,reqId,responseTime,req,res",
        messageFormat: "{msg} [id={reqId} {req.method} {req.url}]",
      },
    },
  },
});

server.get("/", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server listening on ${address}`);
});
