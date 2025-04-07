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

    <v-btn v-if="!isAuthenticated" class="bg-orange-darken-1 text-white text-caption" outlined to="/login">
      Sign In
    </v-btn>

    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn
          color="white text-red text-body-2"
          icon="mdi-heart-outline"
          variant="plain"
          to="/favorites"
        />
        <v-btn v-bind="props" class="bg-orange-darken-1 text-white text-caption" rounded>
          <v-icon left>mdi-account</v-icon>
          Perfil
        </v-btn>
      </template>
      <v-list class="bg-white">
        <v-list-item to="/profile">
          <v-list-item-title><v-icon left>mdi-account</v-icon> Meu Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item to="/myRecipes">
          <v-list-item-title><v-icon left>mdi-chef-hat</v-icon> Minhas Receitas</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title><v-icon left>mdi-logout</v-icon> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const token = ref<string | null>(null)

const isAuthenticated = computed(() => !!token.value)

onMounted(() => {
  token.value = localStorage.getItem('authToken')
})

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  token.value = null
  window.location.reload()
}
</script>

<style lang="css" scoped>
.logo {
  max-width: 3rem;
  max-height: auto;
}
</style>
