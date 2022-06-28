import fastify from "fastify";
import cors from "@fastify/cors";
import { MongoClient } from "mongodb";
import Redis from "ioredis";
import { randomUUID } from "crypto";
import nodemailer, { SendMailOptions } from "nodemailer";

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri!);

const redis = new Redis(process.env.REDIS_URI!);

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jayda.becker90@ethereal.email",
    pass: "HRKDkk3A6qjvCr7WnB",
  },
} as SendMailOptions);

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

(async () => {
  await client.connect();

  const database = client.db("apple-pi");
  const users = database.collection("users");

  type FormValues = {
    email: string;
  };

  server.register(cors, {
    origin: "*",
  });

  server.get("/", async (request, reply) => {
    const allUsers = await users.find({}).toArray();
    return allUsers;
  });

  server.post<{ Body: FormValues }>("/signin", async (request, reply) => {
    server.log.info(request.body.email);
    const user = await users.findOne({ email: request.body.email });
    if (!user) {
      await users.insertOne({
        email: request.body.email,
        createdAt: new Date(),
      });
      server.log.info("User created");
    }
    const uuid = randomUUID();
    redis.set(request.body.email, uuid, "EX", 60 * 60 * 2); // 2 hours expiration
    const info = await transporter.sendMail({
      from: '"Lemon 🍋" <noreply@apple.pi>',
      to: request.body.email,
      subject: "Login Url",
      text: `http://localhost:3000/auth/${uuid}`,
    });
    server.log.info("Message sent: %s", info.messageId);
  });

  await server.listen({ port: 8000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  });
})();
