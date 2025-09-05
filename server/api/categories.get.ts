import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const games = await prisma.game.findMany({ select: { tags: true } })
  // Flatten all tags and return unique
  const allTags = Array.from(new Set(games.flatMap(g => g.tags)))
  return allTags.map(tag => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g,'-') }))
})
