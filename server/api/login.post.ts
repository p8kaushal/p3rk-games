import prisma from '~/server/utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  // Issue JWT (set your own jwt secret)
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } }
})
