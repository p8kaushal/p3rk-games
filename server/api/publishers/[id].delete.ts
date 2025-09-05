import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const user = event.context.auth;
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const publisher = await prisma.publisher.findUnique({ where: { id } });
  if (!publisher) throw createError({ statusCode: 404, statusMessage: 'Not found' });

  const isOwner = user.role === 'admin' || (user.publisherId && user.publisherId === id);
  if (!isOwner) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  await prisma.publisher.delete({ where: { id } });
  return { success: true }
});

