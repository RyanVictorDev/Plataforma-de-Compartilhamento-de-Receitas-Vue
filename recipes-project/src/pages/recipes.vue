<template>
  <v-responsive class="d-flex pa-12 flex-wrap align-center fill-height mx-auto">
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
    <v-row class="d-flex justify-center mt-4">
      <v-col class="d-flex justify-center ga-12" cols="12" sm="6" md="4" lg="3">
        <v-btn @click="previousPage()" :disabled="page === 0">Anterior</v-btn>
        <v-btn @click="nextPage()">Próximo</v-btn>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import RecipeComponent from '@/components/RecipeComponent.vue';

const page = ref(0);

const nextPage = () => {
  page.value += 1;
  getRecipes(page);
};

const previousPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    getRecipes(page);
  }
};

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
  api.get('recipe', { params: { page: page.value } })
    .then(response => {
      recipes.value = response.data.content;
    })
    .catch(error => {
      console.log(error);
    });
};
</script>
