const Fastify = require('fastify')
const fastify = Fastify({ logger: true })

let members = []
let idCounter = 1

fastify.get('/members', async (request, reply) => {
  return members
})

fastify.post('/members', async (request, reply) => {
  const body = request.body || {}
  if (!body.name || !body.email) {
    reply.code(400)
    return { error: 'name and email required' }
  }
  const member = { id: idCounter++, name: body.name, email: body.email }
  members.push(member)
  reply.code(201)
  return member
})

fastify.get('/members/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const member = members.find(m => m.id === id)
  if (!member) {
    reply.code(404)
    return { error: 'member not found' }
  }
  return member
})

fastify.put('/members/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const member = members.find(m => m.id === id)
  if (!member) {
    reply.code(404)
    return { error: 'member not found' }
  }
  const body = request.body || {}
  member.name = body.name ?? member.name
  member.email = body.email ?? member.email
  return member
})

fastify.delete('/members/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const index = members.findIndex(m => m.id === id)
  if (index === -1) {
    reply.code(404)
    return { error: 'member not found' }
  }
  members.splice(index, 1)
  reply.code(204)
  return null
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    fastify.log.info(`server listening on 3000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
