import { Hono } from 'hono'

const app = new Hono()

interface Member {
  id: number
  name: string
  email: string
}

const members: Member[] = []
let idCounter = 1

app.get('/members', (c) => {
  return c.json(members)
})

app.post('/members', async (c) => {
  const body = await c.req.json().catch(() => ({})) as Partial<Member>
  if (!body.name || !body.email) {
    return c.json({ error: 'name and email required' }, 400)
  }
  const member: Member = { id: idCounter++, name: body.name, email: body.email }
  members.push(member)
  return c.json(member, 201)
})

app.get('/members/:id', (c) => {
  const id = Number(c.req.param('id'))
  const member = members.find(m => m.id === id)
  if (!member) {
    return c.json({ error: 'member not found' }, 404)
  }
  return c.json(member)
})

app.put('/members/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const member = members.find(m => m.id === id)
  if (!member) {
    return c.json({ error: 'member not found' }, 404)
  }
  const body = await c.req.json().catch(() => ({})) as Partial<Member>
  member.name = body.name ?? member.name
  member.email = body.email ?? member.email
  return c.json(member)
})

app.delete('/members/:id', (c) => {
  const id = Number(c.req.param('id'))
  const index = members.findIndex(m => m.id === id)
  if (index === -1) {
    return c.json({ error: 'member not found' }, 404)
  }
  members.splice(index, 1)
  return c.body(null, 204)
})

export default app
export const fetch = app.fetch
