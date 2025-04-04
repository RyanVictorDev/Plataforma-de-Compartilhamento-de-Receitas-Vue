<template>
  <v-responsive class="px-12 py-6 fill-height mx-auto">
    <v-row>
      <v-col
        v-for="favorite in recipes"
        :key="favorite.recipe.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <recipe-component
          :id="String(favorite.recipe.id)"
          :title="favorite.recipe.title"
          :description="favorite.recipe.description"
          :tag="favorite.recipe.tag"
        />
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import RecipeComponent from '@/components/RecipeComponent.vue';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  preparation: string;
  tag: string;
  user: User;
}

interface Favorite {
  id: number;
  recipe: Recipe;
  user: User;
}

const recipes = ref<Favorite[]>([]);

const getRecipes = (id: string | null) => {
  api.get('favorite/user/' + id)
    .then(response => {
      recipes.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

onMounted(() => {
  const id = localStorage.getItem('userId');
  getRecipes(id);
});
</script>
