import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const { rating } = await readBody(event)
  // You’ll need to get the authenticated user (parse JWT/session), refer to event.auth/user
  const userId = event.context.auth?.id;
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  // Upsert rating
  const rate = await prisma.rating.upsert({
    where: {
      userId_gameId: { userId, gameId: id }
    },
    update: { value: rating },
    create: { value: rating, userId, gameId: id }
  })
  return { success: true }
})
