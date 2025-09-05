<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'  // Adjust as per your actual store location

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const doLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data, error: apiError } = await useFetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    if (apiError.value || !data.value?.token) {
      throw new Error(data.value?.message || 'Invalid credentials')
    }
    // Save user and token to store or cookies as needed
    userStore.setUser(data.value.user)
    // Optionally, store JWT/localStorage/cookie here
    router.push('/') // Redirect to home or last intended page
  } catch (e) {
    error.value = e.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="doLogin" class="bg-white shadow p-8 rounded w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>
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
      <div v-if="error" class="mb-4 text-red-600 text-sm text-center">{{ error }}</div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full font-bold"
        :disabled="loading"
      >
        <span v-if="loading">Signing in…</span>
        <span v-else>Sign In</span>
      </button>
      <div class="text-center mt-4 text-sm">
        Don’t have an account?
        <NuxtLink to="/register" class="text-blue-600 underline">Create one</NuxtLink>
      </div>
    </form>
  </div>
</template>
