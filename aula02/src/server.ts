import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
    origin: true, // todas url de front poderao acessar o back
    // para ter uma rota de dev e prod sera: [url dev, url prod]
})
app.register(memoriesRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
})