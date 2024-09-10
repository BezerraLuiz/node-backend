import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {z} from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return memories.map(memory => {
        return {
            id: memory.id,
            coverUrl: memory.coverURL,
            excerpt: memory.content.substring(0, 115).concat('...')
        }
    })
  });

  app.get("/memories/:id", async (request) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
        where: {
            id,
        },
    })

    return memory
  });

  app.post("/memories", async (request) => {
    const bodySchema = z.object({
        content: z.string().uuid(),
        coverURL: z.string(),
        isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverURL, isPublic } = bodySchema.parse(request.body)

    const memory = prisma.memory.create({
        data: {
            content,
            coverURL,
            isPublic,
            userId: 'ff95134e-9bcd-47e7-bfb3-d98ea06a3f02'
        },
    })

    return memory
  });

  app.put("/memories", async (request) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
        content: z.string().uuid(),
        coverURL: z.string(),
        isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverURL, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
        where: {
            id,
        },
        data: {
            content,
            coverURL,
            isPublic,
        },
    })

    return memory
  });

  app.delete("/memories", async (request) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
        where: {
            id,
        },
    })
  });
}
