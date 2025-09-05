<script setup>
// Assume you have middleware set up for role-based access
definePageMeta({
  middleware: ['auth'],              // Only admins can access (see your auth.js middleware)
  requiresAdmin: true
})

const { data: stats } = await useFetch('/api/admin/stats') // { games, publishers, players }
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <div class="bg-blue-50 rounded p-6 text-center shadow">
        <div class="text-2xl font-bold">{{ stats?.games ?? '—' }}</div>
        <div class="text-sm text-gray-700 mt-1">Total Games</div>
      </div>
      <div class="bg-green-50 rounded p-6 text-center shadow">
        <div class="text-2xl font-bold">{{ stats?.publishers ?? '—' }}</div>
        <div class="text-sm text-gray-700 mt-1">Total Publishers</div>
      </div>
      <div class="bg-yellow-50 rounded p-6 text-center shadow">
        <div class="text-2xl font-bold">{{ stats?.players ?? '—' }}</div>
        <div class="text-sm text-gray-700 mt-1">Total Players</div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4">Quick Management</h2>
      <div class="flex gap-6">
        <NuxtLink to="/games" class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Manage Games</NuxtLink>
        <NuxtLink to="/publishers" class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">Manage Publishers</NuxtLink>
        <NuxtLink to="/players" class="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700">Manage Players</NuxtLink>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4">Platform Activity (Coming Soon)</h2>
      <div class="bg-gray-50 rounded p-8 text-gray-500 text-center">
        Analytics, moderation activity, or recent logs will go here.
      </div>
    </section>
  </div>
</template>
