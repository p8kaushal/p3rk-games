import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const bypassAuth = true;

    const user = event.context.auth; // Your auth middleware should set this
    if (!bypassAuth && (!user || (user.role !== 'admin' && user.role !== 'publisher')))
      throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });

    const { name, logo, description, website } = await readBody(event)
    if (!name) throw createError({ statusCode: 400, statusMessage: 'Name required' });

    // Optionally enforce user <-> publisher link if needed
    const publisher = await prisma.publisher.create({
      data: {
        name,
        logo,
        description,
        website
      }
    });
    return publisher;
  

});
