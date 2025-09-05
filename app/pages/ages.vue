<script setup>
import { ref, computed } from 'vue'

// Define age categories (customize these as needed)
const ageGroups = [
  { label: 'Everyone', value: 'Everyone' },
  { label: '7+', value: '7+' },
  { label: '12+', value: '12+' },
  { label: '16+', value: '16+' },
  { label: '18+', value: '18+' }
]

const selectedAge = ref('')
const { data: games } = await useFetch('/api/games') // All games

const filteredGames = computed(() => {
  if (!selectedAge.value) return games.value || []
  return (games.value || []).filter(g => g.ageRating === selectedAge.value)
})
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Browse by Player Age</h1>
    <p class="text-gray-600 mb-4">Select an age group to see suitable games for that audience.</p>
    
    <div class="flex flex-wrap gap-4 mb-8">
      <button
        v-for="age in ageGroups"
        :key="age.value"
        :class="[
          'px-4 py-2 rounded border',
          age.value === selectedAge ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        ]"
        @click="selectedAge = age.value"
      >
        {{ age.label }}
      </button>
      <button
        :class="[
          'px-4 py-2 rounded border',
          selectedAge === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        ]"
        @click="selectedAge = ''"
      >
        All Games
      </button>
    </div>

    <div v-if="filteredGames.length === 0" class="text-center text-gray-500 mt-10">
      No games found for this age group.
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
          <span class="text-xs text-gray-500 border rounded px-2 py-1">{{ game.ageRating }}</span>
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
