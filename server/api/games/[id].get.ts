import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const game = await prisma.game.findUnique({
    where: { id },
    include: { publisher: true, ratings: true },
  })
  if (!game) throw createError({ statusCode: 404, statusMessage: 'Game not found' });

  const avgRating = (game.ratings.length > 0) ? (game.ratings.reduce((a,b) => a + b.value, 0) / game.ratings.length) : null;
  return {
    ...game,
    avgRating,
    publisherName: game.publisher.name,
  }
})
