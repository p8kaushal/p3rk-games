import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let orderBy = {};

  if (query.sort === 'trending') orderBy = { createdAt: 'desc' }; // Or: order by plays, etc.
  if (query.sort === 'rating') orderBy = { avgRating: 'desc' };

  const where: any = {};
  if (query.publisherId) where.publisherId = query.publisherId;
  if (query.ageRating) where.ageRating = query.ageRating;

  if (query.query) {
    where.OR = [
      { title: { contains: query.query, mode: 'insensitive' } },
      { tags: { has: query.query } },
    ];
  }

  const games = await prisma.game.findMany({
    where,
    orderBy,
    include: {
      publisher: true,
      ratings: true,
    },
    take: Number(query.limit) || 100,
  });

  // Calculate avgRating for each game
  const withAvg = games.map(game => {
    const ratings = game.ratings.map(r => r.value);
    return {
      ...game,
      avgRating: ratings.length > 0 ? (ratings.reduce((a, b) => a + b) / ratings.length) : null,
      publisherName: game.publisher.name,
    };
  });

  return withAvg;
})
