<script setup>
const { data: games } = await useFetch('/api/games?sort=trending') // Adjust to your backend API
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Trending Games</h1>
    <p class="mb-8 text-gray-600">Discover what's popular right now on P3RK Games.</p>
    <div v-if="!games?.length" class="text-center text-gray-500 mt-12">
      No trending games at this time.
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="game in games"
        :key="game.id"
        class="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg"
      >
        <img
          :src="game.thumbnail"
          :alt="game.title"
          class="w-full h-36 object-cover rounded mb-2"
        />
        <div class="flex justify-between items-center mb-1">
          <h2 class="font-bold">{{ game.title }}</h2>
          <span
            class="text-xs text-gray-500 border rounded px-2 py-1"
          >{{ game.ageRating || "All ages" }}</span>
        </div>
        <div class="flex flex-wrap mb-2 gap-1">
          <span
            v-for="tag in game.tags"
            :key="tag"
            class="bg-gray-200 px-2 py-0.5 rounded text-xs"
          >{{ tag }}</span>
        </div>
        <p class="text-gray-600 text-sm mb-2">{{ game.description.slice(0, 60) }}…</p>
        <NuxtLink
          :to="`/games/${game.id}`"
          class="mt-auto text-xs text-blue-500 underline"
        >Play / Details</NuxtLink>
      </div>
    </div>
  </div>
</template>
