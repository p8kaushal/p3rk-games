<script setup>
const { data: publishers, refresh } = await useFetch('/api/publishers')
const showForm = ref(false)
const form = ref({ name: '', logo: '', description: '', website: '' })
const errorMsg = ref('')
const showSuccess = ref(false)

const submit = async () => {
  errorMsg.value = ''; showSuccess.value = false
  try {
    await $fetch('/api/publishers', { method: 'POST', body: { ...form.value } })
    showSuccess.value = true
    showForm.value = false
    form.value = { name: '', logo: '', description: '', website: '' }
    await refresh()
  } catch (e) {
    errorMsg.value = e.data?.message || 'Creation failed'
  }
}
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl mb-6 font-bold">Publishers</h1>
    <button class="mb-4 bg-green-600 text-white px-4 py-2 rounded font-bold" @click="showForm = true">
      + Add Publisher
    </button>

    <div v-if="showForm" class="bg-gray-100 p-6 rounded mb-8">
      <h2 class="mb-2 text-lg font-bold">Add Publisher</h2>
      <input class="border p-2 w-full mb-2" v-model="form.name" placeholder="Name" />
      <input class="border p-2 w-full mb-2" v-model="form.logo" placeholder="Logo URL (optional)" />
      <input class="border p-2 w-full mb-2" v-model="form.website" placeholder="Website (optional)" />
      <textarea class="border p-2 w-full mb-2" v-model="form.description" placeholder="Description (optional)" />
      <div class="flex gap-4">
        <button @click="submit" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">Submit</button>
        <button @click="showForm = false" class="text-gray-500 font-semibold">Cancel</button>
      </div>
      <div v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</div>
      <div v-if="showSuccess" class="text-green-600 mt-2">Publisher created!</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="pub in publishers"
        :key="pub.id"
        :to="`/publishers/${pub.id}`"
        class="bg-white border rounded px-4 py-3 hover:shadow"
      >
        <div class="flex items-center mb-2 gap-2">
          <img v-if="pub.logo" :src="pub.logo" class="h-10 w-10 object-cover rounded-full border" />
          <h2 class="font-bold text-lg">{{ pub.name }}</h2>
        </div>
        <p class="text-gray-700 text-sm line-clamp-2">{{ pub.description }}</p>
        <div v-if="pub.website" class="text-xs text-blue-500 mt-1">{{ pub.website }}</div>
      </NuxtLink>
    </div>
  </div>
</template>
