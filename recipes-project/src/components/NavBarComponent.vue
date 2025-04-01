<template>
  <v-app-bar class="d-flex px-5" :elevation="2" theme="white" color="white">
    <img class="logo" src="../assets/logo.png" alt="">
    <p class="font-weight-bold">RecipeShare</p>

    <div class="d-flex mx-auto ga-3">
      <v-btn class="text-caption" text to="/">Home</v-btn>
      <v-btn class="text-caption" text to="/recipes">Recipes</v-btn>
      <v-btn class="text-caption" text to="/recipesSubmit">Submit Recipe</v-btn>
      <v-btn class="text-caption" text to="/about">About</v-btn>
    </div>

    <v-text-field
      class="search mr-5"
      v-model="search"
      label="Search recipes..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      rounded="pill"
      density="comfortable"
    />

    <v-btn v-if="!isAuthenticated" class="bg-orange-darken-1 text-white text-caption" outlined to="/login">
      Sign In
    </v-btn>

    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="bg-orange-darken-1 text-white text-caption" rounded>
          <v-icon left>mdi-account</v-icon>
          Profile
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile">
          <v-list-item-title>Meu Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const search = ref('')
const token = ref<string | null>(null)

const isAuthenticated = computed(() => !!token.value)

onMounted(() => {
  token.value = localStorage.getItem('authToken')
})

const logout = () => {
  localStorage.removeItem('authToken')
  token.value = null
  window.location.reload()
}
</script>

<style lang="css" scoped>
.logo {
  max-width: 3rem;
  max-height: auto;
}

.search {
  max-width: 25%;
}
</style>
