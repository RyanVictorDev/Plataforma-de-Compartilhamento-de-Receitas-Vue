<template>
  <v-responsive class="px-12 py-6 fill-height mx-auto">
    <v-row class="justify-center ga-2 mb-4">
      <v-col cols="6" class="d-flex align-center justify-left flex-wrap ga-6">
        <v-chip
          v-for="tag in tags"
          :key="tag"
          class="tag text-caption"
          :class="{ 'selected-chip': actualTag === tag }"
          :color="getTagColor(tag)"
          :variant="actualTag === tag ? 'elevated' : 'outlined'"
          label
          @click="addTag(tag)"
        >
          <v-icon icon="mdi-label" start />
          {{ tag }}
        </v-chip>
      </v-col>

      <v-col cols="5" class="d-flex align-center">
        <v-text-field
          class="search my-auto"
          v-model="search"
          label="Search recipes..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          rounded="pill"
          density="comfortable"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
        <recipe-component
          :id="String(recipe.id)"
          :title="recipe.title"
          :description="recipe.description"
          :tag="recipe.tag"
        />
      </v-col>
    </v-row>

    <v-row class="justify-end mt-4">
      <v-col class="d-flex justify-end ga-2" cols="12" sm="6" md="4" lg="3">
        <v-btn class="bg-orange-darken-4" @click="previousPage" :disabled="page === 0">
          <v-icon icon="mdi-arrow-left" start />Anterior
        </v-btn>
        <v-btn class="bg-orange-darken-4" @click="nextPage">
          Próximo <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import RecipeComponent from '@/components/RecipeComponent.vue';

const page = ref(0);
const search = ref('');

const nextPage = () => {
  page.value += 1;
  getRecipes();
};

const previousPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    getRecipes();
  }
};

const actualTag = ref('');

const addTag = (tag: string) => {
  if (actualTag.value === tag) {
    actualTag.value = '';
    getRecipes();
  } else {
    actualTag.value = tag;
    getRecipes();
  }
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  tag: string;
}

const recipes = ref<Recipe[]>([]);

const getRecipes = () => {
  api.get('recipe', { params: { page: page.value, tag: actualTag.value } })
    .then(response => {
      recipes.value = response.data.content;
    })
    .catch(error => {
      console.log(error);
    });
};

onMounted(() => {
  getRecipes();
});

const tags = ref([
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'VEGAN',
  'VEGETARIAN'
]);

const getTagColor = (tag: string): string => {
  const colors: Record<string, string> = {
    BREAKFAST: 'orange',
    LUNCH: 'blue',
    DINNER: 'orange-darken-2',
    VEGAN: 'green',
    VEGETARIAN: 'light-green'
  };

  return colors[tag.toUpperCase()] || 'grey';
};
</script>

<style scoped>
  .selected-chip {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
</style>
