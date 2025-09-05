<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedCategory = ref('')
const selectedPublisher = ref('')

const { data: games } = await useFetch('/api/games')
const { data: categories } = await useFetch('/api/categories')
const { data: publishers } = await useFetch('/api/publishers')

// Filtered games based on search & filter
const filteredGames = computed(() => {
  let list = games.value || []
  if (search.value) {
    const s = search.value.toLowerCase()
    list = list.filter(g =>
      g.title.toLowerCase().includes(s) ||
      g.tags.some(tag => tag.toLowerCase().includes(s))
    )
  }
  if (selectedCategory.value) {
    list = list.filter(g => g.tags.includes(selectedCategory.value))
  }
  if (selectedPublisher.value) {
    list = list.filter(g => g.publisherId === selectedPublisher.value)
  }
  return list
})
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Browse Games</h1>

    <div class="mb-5 flex flex-wrap gap-4 items-center">
      <input
        class="border rounded p-2 w-60"
        type="text"
        v-model="search"
        placeholder="Search by name or tag"
      />

      <select v-model="selectedCategory" class="border rounded p-2">
        <option value="">All categories</option>
        <option
          v-for="cat in categories"
          :key="cat.slug"
          :value="cat.name"
        >{{ cat.name }}</option>
      </select>

      <select v-model="selectedPublisher" class="border rounded p-2">
        <option value="">All publishers</option>
        <option
          v-for="pub in publishers"
          :key="pub.id"
          :value="pub.id"
        >{{ pub.name }}</option>
      </select>
    </div>

    <div v-if="filteredGames.length === 0" class="text-center text-gray-500 mt-12">
      No games found.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg"
      >
        <img :src="game.thumbnail" :alt="game.title" class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="font-bold mb-1">{{ game.title }}</h2>
        <div class="text-xs text-gray-500 mb-1">
          {{ game.publisherName }} · {{ game.ageRating || "All ages" }}
        </div>
        <div class="flex flex-wrap mb-2 gap-1">
          <span
            v-for="tag in game.tags"
            :key="tag"
            class="bg-gray-200 text-xs px-2 py-1 rounded"
          >{{ tag }}</span>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ game.description.slice(0, 60) }}…</p>
        <NuxtLink
          :to="`/games/${game.id}`"
          class="mt-auto text-blue-500 underline text-xs"
        >Play / Details</NuxtLink>
      </div>
    </div>
  </div>
</template>
