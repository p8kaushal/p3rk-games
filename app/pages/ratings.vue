<script setup>
import { ref, computed } from 'vue'

const ratingFilters = [
  { label: 'All Ratings', value: 0 },
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 }
]

const selectedRating = ref(0)
const { data: games } = await useFetch('/api/games?includeRatings=true') // Make sure each game has avgRating

const filteredGames = computed(() => {
  if (!games.value) return []
  let list = games.value.slice()
  if (selectedRating.value) {
    list = list.filter(g => g.avgRating >= selectedRating.value)
  }
  return list.sort((a, b) => b.avgRating - a.avgRating)
})
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Browse Games by Rating</h1>
    <div class="flex gap-4 mb-8">
      <button
        v-for="f in ratingFilters"
        :key="f.value"
        @click="selectedRating = f.value"
        :class="[
          'px-4 py-2 rounded border font-semibold',
          selectedRating === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
        ]"
      >{{ f.label }}</button>
    </div>

    <div v-if="filteredGames.length === 0" class="text-center text-gray-500 mt-10">
      No games found for this rating filter.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg"
      >
        <img :src="game.thumbnail" :alt="game.title" class="w-full h-36 object-cover rounded mb-2" />
        <div class="flex justify-between items-center mb-1">
          <h2 class="font-bold">{{ game.title }}</h2>
          <span class="text-xs flex items-center gap-1 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
            {{ game.avgRating ? game.avgRating.toFixed(1) : 'N/A' }}
          </span>
        </div>
        <div class="flex flex-wrap mb-2 gap-1">
          <span v-for="tag in game.tags" :key="tag" class="bg-gray-200 px-2 py-0.5 rounded text-xs">{{ tag }}</span>
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
