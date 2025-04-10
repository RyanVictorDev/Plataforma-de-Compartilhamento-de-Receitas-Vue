<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex flex-wrap align-center fill-height mx-auto">
      <div class="banner mb-5">
        <div class="bannerContent d-flex flex-column text-white ml-5 ga-2 my-auto">
          <p class="text-h4 font-weight-bold">Compartilhe suas criações culinárias</p>
          <p class="text-body-1">
            Descubra receitas incríveis de todo o mundo ou compartilhe as suas para todos os amantes de comida
          </p>

          <div class="d-flex ga-8">
            <v-btn size="large" class="text-orange" color="white" to="/recipes">Explorar Receitas</v-btn>
            <v-btn size="large" variant="outlined" to="/recipesSubmit">Enviar uma Receita</v-btn>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12">
          <p class="text-h5 font-weight-bold mb-2">Últimas receitas compartilhadas</p>

          <div class="scroll-wrapper">
            <div class="scroll-content">
              <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="scroll-item"
              >
                <recipe-component
                  :id="String(recipe.id)"
                  :user-id="String(recipe.user.id)"
                  :title="recipe.title"
                  :description="recipe.description"
                  :tag="recipe.tag"
                />
              </div>
            </div>
          </div>
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
  user: {
    id: number;
  };
}

const recipes = ref<Recipe[]>([]);

onMounted(() => {
  getRecipes();
});

const getRecipes = () => {
  api.get('recipe', { params: { page: 0 } })
    .then(response => {
      recipes.value = response.data.content;
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
  background-image: url('@/assets/imageBanner.png');
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

.scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
}

.scroll-wrapper::-webkit-scrollbar {
  height: 8px;
}

.scroll-wrapper::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: #ff9900b0;
  border-radius: 4px;
  transition: background-color 0.5s ease-in-out;
}

.scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #ff8c00;
}

.scroll-content {
  display: flex;
}

.scroll-item {
  min-width: 280px;
  flex-shrink: 0;
}
</style>
