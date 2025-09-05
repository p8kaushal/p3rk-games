<script setup>
import { ref } from 'vue'
// Example: Fetch trending games and categories (replace with your actual API)
const { data: trending } = await useFetch('/api/games?sort=trending&limit=8')
const { data: categories } = await useFetch('/api/categories')
const search = ref('')

const doSearch = () => {
  if (search.value.trim()) {
    navigateTo(`/games?query=${encodeURIComponent(search.value)}`)
  }
}
</script>

<template>
  <div class="container mx-auto px-2 py-8">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-2">🎮 P3RK Games Hub</h1>
      <p class="text-lg text-gray-600">Browse, play, and publish amazing games!</p>
    </header>

    <section class="mb-6 flex justify-center">
      <input
        v-model="search"
        @keyup.enter="doSearch"
        class="border p-2 rounded-l w-64"
        type="text"
        placeholder="Search for games…"
      />
      <button @click="doSearch" class="bg-blue-600 text-white px-4 rounded-r">Search</button>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Trending Games</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="game in trending"
          :key="game.id"
          class="bg-white rounded shadow p-4 flex flex-col items-center hover:shadow-lg"
        >
          <img
            :src="game.thumbnail"
            :alt="game.title"
            class="w-32 h-32 object-cover rounded mb-3"
          />
          <h3 class="font-bold mb-1">{{ game.title }}</h3>
          <p class="text-xs mb-2 text-gray-500">{{ game.tags.join(', ') }}</p>
          <NuxtLink
            :to="`/games/${game.id}`"
            class="text-blue-600 underline text-xs mt-auto"
          >View Game</NuxtLink>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Explore Games by Category</h2>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/categories/${cat.slug}`"
          class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >{{ cat.name }}</NuxtLink>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">More Ways to Discover</h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink to="/trending" class="text-blue-500 underline">Trending Games</NuxtLink>
        <NuxtLink to="/ratings" class="text-blue-500 underline">By Rating</NuxtLink>
        <NuxtLink to="/publishers" class="text-blue-500 underline">By Publisher</NuxtLink>
        <NuxtLink to="/ages" class="text-blue-500 underline">By Player Age</NuxtLink>
      </div>
    </section>

    <footer class="text-center text-sm text-gray-400 mt-12">
      &copy; {{ new Date().getFullYear() }} P3RK Games
    </footer>
  </div>
</template>
