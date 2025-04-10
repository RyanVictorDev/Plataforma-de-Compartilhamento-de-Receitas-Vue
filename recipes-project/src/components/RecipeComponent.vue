<template>
  <v-sheet
    class="d-flex flex-column justify-space-between align-left pa-3 text-center mx-auto"
    color="grey-lighten-5"
    elevation="3"
    width="255"
    height="250"
    rounded="lg"
  >
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>

    <div class="d-flex justify-space-between align-center mb-3">
      <v-chip class="tag align-left text-caption" :color="tagColor" label>
        <v-icon icon="mdi-label" start></v-icon>
        {{ translatedTag }}
      </v-chip>

      <div v-if="userId !== userIdLocal" class="d-flex align-center">
        <v-btn
          v-if="!isLiked"
          color="white text-red text-body-2"
          icon="mdi-heart-outline"
          variant="plain"
          @click="like"
        />

        <v-btn
          v-if="isLiked"
          color="white text-red text-body-2"
          icon="mdi-heart"
          variant="text"
          @click="unliked"
        />
      </div>

      <div v-else>
        <v-btn
          color="white text-green text-body-2"
          icon="mdi-pencil-outline"
          variant="plain"
          @click="router.push(`/recipeUpdate/${id}`)"
        />

        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="white text-red text-body-2"
              icon="mdi-trash-can-outline"
              variant="plain"
            />
          </template>

          <template v-slot:default="{ isActive }">
            <v-card class="bg-white text-black" title="Deseja deletar esta receita?">
              <v-card-text>
                Você tem certeza que deseja deletar esta receita? Esta ação não pode ser desfeita.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Não, cancelar"
                  @click="isActive.value = false"
                />

                <v-btn
                  text="Sim, deletar"
                  @click="isActive.value = false, deleteRecipe()"
                />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>

    <div>
      <p class="text-body-1 text-left font-weight-bold mb-2">{{ title }}</p>
      <p class="mb-4 text-left text-body-2 description">{{ description }}</p>
    </div>

    <v-divider class="mb-4" />

    <v-btn color="grey-lighten-4" class="text-yellow-darken-4" @click="router.push(`/recipes/${id}`)">
      Ver receita
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import { useRouter } from 'vue-router';

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false,
    default: ''
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

const translatedTag = computed(() => {
  switch (props.tag.toUpperCase()) {
    case 'BREAKFAST':
      return 'Café da Manhã';
    case 'LUNCH':
      return 'Almoço';
    case 'DINNER':
      return 'Jantar';
    case 'VEGAN':
      return 'Vegano';
    case 'VEGETARIAN':
      return 'Vegetariano';
    default:
      return 'Outro';
  }
});

const userIdLocal = ref();
const isLiked = ref(false);
const likeId = ref('');

onMounted(() => {
  userIdLocal.value = localStorage.getItem('userId');
  if (userIdLocal.value) {
    getFavorites(userIdLocal.value);
  } else {
    console.error('User ID não encontrado');
  }
});

const getFavorites = async (userId: string) => {
  try {
    const response = await api.get(`favorite/user/${userId}`);

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
  } catch (error) { console.error("Erro ao buscar favoritos:", error); }
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

const deleteRecipe = async () => {
  try {
    await api.delete(`/recipe/${props.id}`);
    console.log("Receita deletada com sucesso");

    snackbar.value = {
      show: true,
      message: "Receita deletada com sucesso!",
      color: "success",
    };

    setTimeout(() => {
      router.go(0);;
    }, 1000);
  } catch (error) {
    console.error("Erro ao deletar receita:", error);
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
