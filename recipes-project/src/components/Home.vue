<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex flex-wrap align-center fill-height mx-auto">
      <div class="banner mb-5">
        <div class="bannerContent d-flex flex-column text-white ml-5 ga-2 my-auto">
          <p class="text-h4 font-weight-bold">Share Your Culinary Creations</p>
          <p class="text-body-1">Discover amazing recipes from around the world or share your own with our community of food enthusiasts</p>

          <div class="d-flex ga-8">
            <v-btn size="large" class="text-orange" color="white">Explore Recipes</v-btn>
            <v-btn size="large" variant="outlined" to="/recipesSubmit">Share a Recipe</v-btn>
          </div>
        </div>
      </div>
      <v-row class="d-flex">
        <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
          <recipe-component
            :id="String(recipe.id)"
            :title="recipe.title"
            :description="recipe.description"
            :tag="recipe.tag"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import RecipeComponent from './RecipeComponent.vue';

interface Recipe {
  id: number;
  title: string;
  description: string;
  tag: string;
}

const recipes = ref<Recipe[]>([]);

onMounted(() => {
  getRecipes();
});

const getRecipes = () => {
  api.get('recipe')
    .then(response => {
      recipes.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 400px;
  background-image: url('@/assets/image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: left;
}


.bannerContent{
  max-width: 55%;
  max-height: 30%;
}
</style>
