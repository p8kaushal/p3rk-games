<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { data: publisher, refresh } = await useFetch(`/api/publishers/${route.params.id}`)
const editing = ref(false)
const form = ref({})
const showDelete = ref(false)
const errorMsg = ref('')
const showSuccess = ref(false)

// Auth logic: Adjust according to your actual user/role system (pseudo example):
const userStore = useUserStore?.()
const isAdmin = userStore?.user?.role === 'admin'
const isOwner = userStore?.user?.publisherId === route.params.id

const beginEdit = () => {
  form.value = { name: publisher.value.name, logo: publisher.value.logo, description: publisher.value.description, website: publisher.value.website }
  editing.value = true
}
const saveEdits = async () => {
  errorMsg.value = ''; showSuccess.value = false
  try {
    await $fetch(`/api/publishers/${route.params.id}`, { method: 'PATCH', body: { ...form.value } })
    showSuccess.value = true
    editing.value = false
    await refresh()
  } catch (e) {
    errorMsg.value = e.data?.message || 'Update failed'
  }
}
const del = async () => {
  errorMsg.value = ''; showSuccess.value = false
  try {
    await $fetch(`/api/publishers/${route.params.id}`, { method: 'DELETE' })
    showSuccess.value = true
    setTimeout(() => router.push('/publishers'), 1200)
  } catch (e) {
    errorMsg.value = e.data?.message || 'Delete failed'
  }
}
</script>

<template>
  <div class="container mx-auto py-10" v-if="publisher">
    <div class="flex items-center gap-4 mb-6">
      <img v-if="publisher.logo" :src="publisher.logo" class="h-20 w-20 object-cover rounded-full border" />
      <div>
        <h1 class="text-3xl font-bold">{{ publisher.name }}</h1>
        <a v-if="publisher.website" :href="publisher.website" target="_blank" class="text-xs text-blue-600 underline">{{ publisher.website }}</a>
      </div>
    </div>
    <div class="mb-3 max-w-xl text-gray-700">{{ publisher.description }}</div>
    <div v-if="isAdmin || isOwner" class="mb-4">
      <button class="bg-yellow-500 text-white px-4 py-1 mr-2 rounded" @click="beginEdit">Edit</button>
      <button class="bg-red-600 text-white px-4 py-1 rounded" @click="showDelete = true">Delete</button>
    </div>
    <div v-if="editing" class="bg-gray-50 border rounded p-6 max-w-xl mb-5">
      <h2 class="mb-2 font-bold">Edit Publisher</h2>
      <input class="border p-2 w-full mb-2" v-model="form.name" placeholder="Name" />
      <input class="border p-2 w-full mb-2" v-model="form.logo" placeholder="Logo URL" />
      <input class="border p-2 w-full mb-2" v-model="form.website" placeholder="Website" />
      <textarea class="border p-2 w-full mb-2" v-model="form.description" placeholder="Description" />
      <div class="flex gap-3">
        <button class="bg-green-600 text-white px-4 py-1 rounded" @click="saveEdits">Save</button>
        <button class="text-gray-600" @click="editing = false">Cancel</button>
      </div>
      <div v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</div>
      <div v-if="showSuccess" class="text-green-600 mt-2">Publisher updated!</div>
    </div>
    <div v-if="showDelete" class="p-4 bg-red-50 border mt-4 rounded mb-4">
      <p class="mb-2">Are you sure you want to delete this publisher? This action is irreversible.</p>
      <button class="bg-red-600 text-white px-4 py-1 mr-2 rounded" @click="del">Yes, Delete</button>
      <button class="text-gray-600" @click="showDelete = false">Cancel</button>
      <div v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</div>
      <div v-if="showSuccess" class="text-green-600 mt-2">Publisher deleted!</div>
    </div>

    <h2 class="text-2xl mt-8 mb-4 font-semibold">Games by {{ publisher.name }}</h2>
    <div v-if="publisher.games.length === 0" class="text-gray-500">No games yet.</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="game in publisher.games"
        :key="game.id"
        class="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg"
      >
        <img :src="game.thumbnail" :alt="game.title" class="w-full h-32 object-cover rounded mb-2" />
        <h3 class="font-bold mb-2">{{ game.title }}</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          <span v-for="tag in game.tags" :key="tag" class="text-xs bg-gray-200 px-2 py-0.5 rounded">{{ tag }}</span>
        </div>
        <p class="text-gray-600 text-xs">{{ game.description.slice(0, 40) }}…</p>
        <NuxtLink :to="`/games/${game.id}`" class="text-blue-500 text-xs mt-2 underline">Game Details</NuxtLink>
      </div>
    </div>
  </div>
</template>
