<template>
  <v-container class="mx-auto fill-height d-flex flex-column align-center justify-center">
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>

    <v-card class="pa-5 form bg-white" elevation="3">
      <p class="mb-6 text-center text-h5 font-weight-bold">Atualizar Receita</p>

      <v-form fast-fail @submit.prevent="updateRecipe" ref="form">
        <v-row class="justify-space-between">
          <v-col cols="12" md="9">
            <v-text-field
              v-model="recipe.title"
              label="Título"
              required
              :rules="[rules.required]"
              density="comfortable"
              variant="outlined"
              prepend-inner-icon="mdi-pen"
            />
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="recipe.tag"
              label="Categoria"
              :items="tagOptions"
              item-title="label"
              item-value="value"
              required
              :rules="[rules.required]"
              density="comfortable"
              variant="outlined"
              prepend-inner-icon="mdi-tag"
            />
          </v-col>
        </v-row>


        <v-textarea
          v-model="recipe.description"
          label="Descrição"
          required
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-comment"
        />

        <v-textarea
          v-model="recipe.ingredients"
          label="Ingredientes"
          required
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-barley"
        />

        <v-textarea
          v-model="recipe.preparation"
          label="Modo de preparo"
          required
          :rules="[rules.required]"
          variant="outlined"
          prepend-inner-icon="mdi-chef-hat"
        />
        <v-col class="mx-auto" cols="9" md="3">
          <v-btn class="btn mt-4" color="yellow-darken-3" type="submit" block>
            Atualizar Receita
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

onMounted(() => {
  getRecipe(props.id);
});

const getRecipe = async (id: string) => {
  try {
    const response = await api.get(`/recipe/${id}`);
    recipe.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
  }
};

const router = useRouter();

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});

const recipe = ref({
  title: '',
  description: '',
  ingredients: '',
  preparation: '',
  tag: ''
});

const tagOptions = ref([
  { label: 'Café da manhã', value: 'BREAKFAST' },
  { label: 'Almoço', value: 'LUNCH' },
  { label: 'Jantar', value: 'DINNER' },
  { label: 'Vegano', value: 'VEGAN' },
  { label: 'Vegetariano', value: 'VEGETARIAN' }
]);

const userId = localStorage.getItem('userId');

const rules = {
  required: (value: string) => !!value || 'Campo obrigatório',
};

const updateRecipe = async () => {
  try {
    if (!userId) {
      console.error("Erro: Usuário não encontrado.");
      return;
    }

    await api.put('/recipe/' + props.id, {
      ...recipe.value,
    });

    snackbar.value = {
      show: true,
      message: "Receita atualizada com sucesso!",
      color: "success",
    };

    router.push('/myRecipes');

    recipe.value = {
      title: '',
      description: '',
      ingredients: '',
      preparation: '',
      tag: ''
    };

  } catch (err: unknown) {
    let errorMessage = "Erro ao atualizar!";

    if (axios.isAxiosError(err) && err.response) {
      errorMessage += " " + (err.response.data?.error || err.message);
    }

    snackbar.value = {
      show: true,
      message: errorMessage,
      color: "error",
    };

    console.log(err);
  }
};
</script>

<style scoped>
.form {
  width: 100%;
}
</style>
