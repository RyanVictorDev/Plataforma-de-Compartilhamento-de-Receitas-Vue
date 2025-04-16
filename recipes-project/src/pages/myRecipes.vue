<template>
  <v-responsive class="px-12 py-6 fill-height mx-auto">
    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
        <recipe-component
          :id="String(recipe.id)"
          :title="recipe.title"
          :description="recipe.description"
          :tag="recipe.tag"
          :userId="String(recipe.user.id)"
        />
      </v-col>
    </v-row>

    <!-- <v-row class="justify-end mt-4">
      <v-col class="d-flex justify-end ga-2" cols="12" sm="6" md="4" lg="3">
        <v-btn class="bg-orange-darken-4" @click="previousPage" :disabled="page === 0">
          <v-icon icon="mdi-arrow-left" start />Anterior
        </v-btn>
        <v-btn class="bg-orange-darken-4" @click="nextPage">
          Próximo <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </v-col>
    </v-row> -->
  </v-responsive>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import RecipeComponent from '@/components/RecipeComponent.vue';

// const page = ref(0);

// const nextPage = () => {
//   page.value += 1;
//   getRecipes();
// };

// const previousPage = () => {
//   if (page.value > 0) {
//     page.value -= 1;
//     getRecipes();
//   }
// };

// const actualTag = ref('');

// const addTag = (tag: string) => {
//   if (actualTag.value === tag) {
//     actualTag.value = '';
//     getRecipes();
//   } else {
//     actualTag.value = tag;
//     getRecipes();
//   }
// }

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

const getRecipes = (id: string | null) => {
  api.get('recipe/user/' + id)
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

// const tags = ref([
//   'BREAKFAST',
//   'LUNCH',
//   'DINNER',
//   'VEGAN',
//   'VEGETARIAN'
// ]);

// const getTagColor = (tag: string): string => {
//   const colors: Record<string, string> = {
//     BREAKFAST: 'orange',
//     LUNCH: 'blue',
//     DINNER: 'orange-darken-2',
//     VEGAN: 'green',
//     VEGETARIAN: 'light-green'
//   };

//   return colors[tag.toUpperCase()] || 'grey';
// };
</script>

<style scoped>
  .selected-chip {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
</style>
