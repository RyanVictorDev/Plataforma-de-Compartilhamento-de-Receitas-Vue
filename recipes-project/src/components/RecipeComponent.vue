<template>
  <v-sheet
    class="d-flex flex-column align-left pa-3 text-center mx-auto"
    color="grey-lighten-5"
    elevation="3"
    width="255"
    rounded="lg"
  >
    <div class="d-flex justify-space-between align-center mb-3">
      <v-chip class="tag align-left text-caption" :color="tagColor" label>
        <v-icon icon="mdi-label" start></v-icon>
        {{ tag }}
      </v-chip>

      <v-btn
        v-if="!isLiked"
        color="white text-red text-body-2"
        icon="mdi-heart-outline"
        variant="plain"
      />

      <v-btn
        v-else
        color="white text-red text-body-2"
        icon="mdi-heart"
        variant="text"
      />
    </div>

    <p class="text-body-1 text-left font-weight-bold mb-2">{{ title }}</p>

    <p class="mb-4 text-left text-body-2">{{ description }}</p>

    <v-divider class="mb-4" />

    <v-btn color="grey-lighten-4" class="text-yellow-darken-4">
      Ver receita
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/boot/axios';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
});

const tagColor = computed(() => {
  const colors: Record<string, string> = {
    BREAKFAST: 'orange',
    LUNCH: 'blue',
    DINNER: 'orange-darken-2',
    VEGAN: 'green',
    VEGETARIAN: 'light-green'
  };

  return colors[props.tag.toUpperCase()] || 'grey';
});

const isLiked = ref(false);
const likesQtd = ref(0);

const getFavorites = async (id: string) => {
  try {
    const response = await api.get(`favorite/user/${id}`);
    console.log("AQUI AAAAAAAAAAAAAA", response);

    if (Array.isArray(response.data) && response.data.length > 0) {
      const favoriteRecipes = response.data.map(entry => entry.recipe);

      for (const recipe of favoriteRecipes) {
        if (recipe.id == props.id) {
          isLiked.value = true;
          likesQtd.value += 1;
        }
      }
      console.log("isLiked:", isLiked.value, "likesQtd:", likesQtd.value);
    } else {
      console.error("Nenhum favorito encontrado:", response.data);
    }
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
  }
};

onMounted(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    getFavorites(userId);
    console.log(userId)
  } else {
    console.error('User is null');
  }
});
</script>

<style>
.tag {
  max-width: fit-content;
}
</style>
