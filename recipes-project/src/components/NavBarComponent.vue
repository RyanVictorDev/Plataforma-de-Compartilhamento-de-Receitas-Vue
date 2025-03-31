<template>
  <v-app-bar class="d-flex px-5" :elevation="2" theme="white" color="white">
    <img class="logo" src="../assets/logoRecipe.png" alt="">
    <p class="font-weight-bold">RecipeShare</p>

    <!-- <v-spacer /> -->
    <div class="d-flex mx-auto ga-3">
      <v-btn class="text-caption" text to="/">Home</v-btn>
      <v-btn class="text-caption" text to="/recipes">Recipes</v-btn>
      <v-btn class="text-caption" text to="/recipesSubmit">Submit Recipe</v-btn>
      <v-btn class="text-caption" text to="/about">About</v-btn>
    </div>

    <!-- <v-spacer /> -->

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


    <v-btn class="bg-orange-darken-1 text-white text-caption" outlined to="./">Sign In</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const search = ref('')
</script>

<style lang="css" scoped>
  .logo{
    max-width: 3rem;
    max-height: auto;
  }

  .search{
    max-width: 25%;

  }
</style>
