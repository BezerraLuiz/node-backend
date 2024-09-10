// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.write('Hello World')

//     return res.end()
// })

// localhost:3333
// server.listen(3333)

/** Utilizando Fastify */
import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memorie.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres()

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/:id

// Route Parameter

// Request body (POST, PUT)

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request, reply) => {
  const search = request.query.search // Query Parameter

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send(); // 204 -> Sucesso, porém sem conteúdo, resposta vazia.
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
