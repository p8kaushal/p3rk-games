<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: publisher, pending: pendingPublisher } = await useFetch(`/api/publishers/${route.params.id}`)
const { data: games, pending: pendingGames } = await useFetch(`/api/games?publisherId=${route.params.id}`)
</script>

<template>
  <div class="container mx-auto py-8">
    <div v-if="pendingPublisher || pendingGames" class="text-center py-20">
      Loading publisher information…
    </div>
    <template v-else>
      <div class="mb-8 flex items-center gap-4">
        <img
          v-if="publisher.logo"
          :src="publisher.logo"
          :alt="publisher.name"
          class="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 class="text-3xl font-bold">{{ publisher.name }}</h1>
          <div class="text-gray-600 text-sm mb-1" v-if="publisher.website">
            <a :href="publisher.website" target="_blank" class="text-blue-600 underline">{{ publisher.website }}</a>
          </div>
          <p class="max-w-xl text-gray-700 mb-2" v-if="publisher.description">{{ publisher.description }}</p>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-4">Games by {{ publisher.name }}</h2>
        <div v-if="games.length === 0" class="text-gray-500 mb-8">
          No games found for this publisher.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="game in games"
            :key="game.id"
            class="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg"
          >
            <img :src="game.thumbnail" :alt="game.title" class="w-full h-40 object-cover rounded mb-2" />
            <div class="flex justify-between items-center mb-1">
              <h3 class="font-bold">{{ game.title }}</h3>
              <span class="text-xs text-gray-500 border rounded px-2 py-1">{{ game.ageRating || "All ages" }}</span>
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
  </div>
</template>
