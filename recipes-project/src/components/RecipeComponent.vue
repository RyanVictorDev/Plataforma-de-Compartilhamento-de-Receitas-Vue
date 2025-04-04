<template>
  <v-sheet
    class="d-flex flex-column justify-space-between align-left pa-3 text-center mx-auto"
    color="grey-lighten-5"
    elevation="3"
    width="255"
    height="250"
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
        @click="like"
      />

      <v-btn
        v-else
        color="white text-red text-body-2"
        icon="mdi-heart"
        variant="text"
        @click="unliked"
      />
    </div>

    <div>
      <p class="text-body-1 text-left font-weight-bold mb-2">{{ title }}</p>
      <p class="mb-4 text-left text-body-2 description">{{ description }}</p>
    </div>

    <v-divider class="mb-4" />

    <v-btn color="grey-lighten-4" class="text-yellow-darken-4">
      Ver receita
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter()

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
const likeId = ref('');

onMounted(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    getFavorites(userId);
  } else {
    console.error('User ID não encontrado');
  }
});

const getFavorites = async (userId: string) => {
  try {
    const response = await api.get(`favorite/user/${userId}`);
    console.log("AQUI A RESPOSTA", response);

    if (Array.isArray(response.data) && response.data.length > 0) {
      const favorite = response.data.find(entry => entry.recipe.id == props.id);

      if (favorite) {
        isLiked.value = true;
        likeId.value = favorite.id;
      } else {
        isLiked.value = false;
        likeId.value = '';
      }
    } else {
      isLiked.value = false;
      likeId.value = '';
    }

    console.log("isLiked:", isLiked.value, "likeId:", likeId.value);
  } catch (error) {}
};

const like = async () => {
  try {
    const response = await api.post('/favorite', {
      userId: localStorage.getItem('userId'),
      recipeId: props.id
    });

    console.log("Favorito adicionado", response);
    isLiked.value = true;

    getFavorites(localStorage.getItem('userId')!);
  } catch (error) {
    console.error("Erro ao curtir:", error);
    router.push('/login');
  }
};

const unliked = async () => {
  try {
    await api.delete(`/favorite/${likeId.value}`);
    console.log("Favorito removido");

    isLiked.value = false;
    likeId.value = '';
  } catch (error) {
    console.error("Erro ao descurtir:", error);
  }
};
</script>

<style>
.tag {
  max-width: fit-content;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 5rem;
}


</style>
