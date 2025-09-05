<script setup>
const route = useRoute()
const { data: game } = await useFetch(`/api/games/${route.params.id}`)
</script>
<template>
  <div>
    <h1>{{ game.title }}</h1>
    <p>{{ game.description }}</p>
    <!-- Ratings, categories, publisher info -->
  </div>
</template>
