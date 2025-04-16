<template>
  <v-container class="mx-auto fill-height d-flex flex-column align-center justify-center">
    <v-card class="pa-5 form bg-white" elevation="3">
      <div class="d-flex flex-column justify-center mb-6">
        <p class="text-center text-h5 font-weight-bold">{{ recipe.title }}</p>
        <p class="text-right text-body-2">Receita enviada por: {{ recipe.user.name }}</p>
      </div>

      <v-form fast-fail ref="form">
        <v-row class="justify-space-between">
          <v-col cols="12" md="9">
            <v-text-field
              v-model="recipe.title"
              label="Título"
              required
              density="comfortable"
              variant="outlined"
              prepend-inner-icon="mdi-pen"
              readonly
            />
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="recipe.tag"
              label="Categoria"
              :items="tagOptions"
              required
              density="comfortable"
              variant="outlined"
              prepend-inner-icon="mdi-tag"
              readonly
            />
          </v-col>
        </v-row>


        <v-textarea
          v-model="recipe.description"
          label="Descrição"
          required
          variant="outlined"
          prepend-inner-icon="mdi-comment"
          readonly
        />

        <v-textarea
          v-model="recipe.ingredients"
          label="Ingredientes"
          required
          variant="outlined"
          prepend-inner-icon="mdi-barley"
          readonly
        />

        <v-textarea
          v-model="recipe.preparation"
          label="Modo de preparo"
          required
          variant="outlined"
          prepend-inner-icon="mdi-chef-hat"
          readonly
        />
        <v-col v-if="userIdLocal != recipe.user.id" class="d-flex" cols="12">
          <v-btn v-if="!isLiked" @click="like" class="ml-auto" color="red" variant="outlined" icon="mdi-heart-outline" />
          <v-btn v-else @click="unliked" class="ml-auto" color="red" variant="outlined" icon="mdi-heart" />
        </v-col>
        <v-col v-else class="d-flex" cols="12">
          <v-btn
            color="white text-green text-body-2 ml-auto"
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
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import { useRouter } from 'vue-router';

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

onMounted(() => {
  userIdLocal.value = localStorage.getItem('userId');
    if (userIdLocal.value) {
    getFavorites(userIdLocal.value);
  }

  getRecipe(props.id);
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

const userIdLocal = ref();
const isLiked = ref(false);
const likeId = ref('');

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

const getRecipe = async (id: string) => {
  try {
    const response = await api.get(`/recipe/${id}`);
    recipe.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
  }
};

const recipe = ref({
  title: '',
  description: '',
  ingredients: '',
  preparation: '',
  tag: '',
  user: {
    id: '',
    name: ''
  }
});

const tagOptions = ref([
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'VEGAN',
  'VEGETARIAN'
]);

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
      router.push('/myRecipes');;
    }, 1000);
  } catch (error) {
    console.error("Erro ao deletar receita:", error);
  }
};
</script>

<style scoped>
.form {
  width: 100%;
}
</style>
