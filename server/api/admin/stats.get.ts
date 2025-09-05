import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const [games, publishers, players] = await Promise.all([
    prisma.game.count(),
    prisma.publisher.count(),
    prisma.user.count({ where: { role: 'player' } })
  ])
  return { games, publishers, players }
})
