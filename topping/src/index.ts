import fastify from "fastify";

const server = fastify({
  logger: true,
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
