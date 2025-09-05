<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const { data: publishers } = await useFetch('/api/publishers')

// Filtered publishers list
const filteredPublishers = computed(() => {
  let list = publishers.value || []
  if (search.value) {
    const s = search.value.toLowerCase()
    list = list.filter(p => 
      p.name.toLowerCase().includes(s) ||
      (p.description && p.description.toLowerCase().includes(s))
    )
  }
  return list
})
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Game Publishers</h1>
    
    <div class="mb-4">
      <input
        class="border rounded p-2 w-64"
        v-model="search"
        type="text"
        placeholder="Search publishers by name or description"
      />
    </div>

    <div v-if="filteredPublishers.length === 0" class="text-center text-gray-500 mt-10">
      No publishers found.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="pub in filteredPublishers"
        :key="pub.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg"
      >
        <div class="flex items-center mb-2">
          <img 
            v-if="pub.logo"
            :src="pub.logo"
            alt="logo"
            class="w-10 h-10 rounded-full border mr-3"
          />
          <div>
            <h2 class="font-bold text-lg">{{ pub.name }}</h2>
          </div>
        </div>
        <div class="text-sm text-gray-500 mb-2" v-if="pub.website">
          <a :href="pub.website" class="text-blue-500 underline" target="_blank">Website</a>
        </div>
        <p class="text-gray-700 text-sm mb-3" v-if="pub.description">{{ pub.description }}</p>
        <NuxtLink
          :to="`/publishers/${pub.id}`"
          class="mt-auto text-xs text-blue-500 underline"
        >View Games &rarr;</NuxtLink>
      </div>
    </div>
  </div>
</template>
