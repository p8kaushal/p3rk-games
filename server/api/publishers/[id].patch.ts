import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const user = event.context.auth;
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  // If you want only the publisher/owner or admin to access:
  const publisher = await prisma.publisher.findUnique({ where: { id } });
  if (!publisher) throw createError({ statusCode: 404, statusMessage: 'Not found' });

  // Example simple ownership check (customize as needed):
  const isOwner = user.role === 'admin' || (user.publisherId && user.publisherId === id);
  if (!isOwner) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const { name, logo, description, website } = await readBody(event);

  const updated = await prisma.publisher.update({
    where: { id },
    data: {
      name: name ?? publisher.name,
      logo: logo ?? publisher.logo,
      description: description ?? publisher.description,
      website: website ?? publisher.website
    }
  });
  return updated;
});
