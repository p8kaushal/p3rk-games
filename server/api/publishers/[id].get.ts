import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  return prisma.publisher.findUnique({ where: { id } })
})
