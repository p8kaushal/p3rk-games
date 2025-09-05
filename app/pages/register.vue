<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'  // Adjust as per your store location

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('player')
const error = ref('')
const loading = ref(false)

const roles = [
  { value: 'player', label: 'Player' },
  { value: 'publisher', label: 'Publisher' }
]

const doRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data, error: apiError } = await useFetch('/api/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value, role: role.value }
    })
    if (apiError.value || !data.value?.user) {
      throw new Error(data.value?.message || 'Registration failed')
    }
    userStore.setUser(data.value.user)
    router.push('/') // Redirect to home or dashboard
  } catch (e) {
    error.value = e.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="doRegister" class="bg-white shadow p-8 rounded w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <div class="mb-4">
        <label class="block text-sm mb-1">Full Name</label>
        <input
          v-model="name"
          type="text"
          required
          class="border px-3 py-2 rounded w-full"
          placeholder="Your full name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="border px-3 py-2 rounded w-full"
          placeholder="you@example.com"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="border px-3 py-2 rounded w-full"
          placeholder="••••••••"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm mb-1">Register as</label>
        <select v-model="role" class="border px-3 py-2 rounded w-full">
          <option v-for="r in roles" :value="r.value" :key="r.value">{{ r.label }}</option>
        </select>
      </div>
      <div v-if="error" class="mb-4 text-red-600 text-sm text-center">{{ error }}</div>
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded w-full font-bold"
        :disabled="loading"
      >
        <span v-if="loading">Registering…</span>
        <span v-else>Register</span>
      </button>
      <div class="text-center mt-4 text-sm">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 underline">Sign in</NuxtLink>
      </div>
    </form>
  </div>
</template>
