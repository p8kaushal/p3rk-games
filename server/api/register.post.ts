import prisma from '~/server/utils/prisma'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const { email, password, name, role } = await readBody(event)
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw createError({ statusCode: 400, statusMessage: 'Email in use' })

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hash, name, role },
  })
  // Return minimal user info for front-end session
  return { user: { id: user.id, email: user.email, role: user.role } }
})
