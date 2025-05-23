<template>
  <v-container class="mx-auto fill-height d-flex flex-column align-center justify-center">
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>

    <v-card class="pa-5 form bg-white" elevation="3">

      <p class="mb-6 text-center text-h5 font-weight-bold">Envie sua receita</p>

      <v-form fast-fail @submit.prevent="createRecipe">
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
            Criar Receita
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { api } from '@/boot/axios';
import { useRouter } from 'vue-router';
import axios from 'axios';

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

const createRecipe = async () => {
  try {
    if (!userId) {
      console.error("Erro: Usuário não encontrado.");
      return;
    }

    await api.post('/recipe', {
      ...recipe.value,
      userId
    });

    snackbar.value = {
      show: true,
      message: "Receita criada com sucesso!",
      color: "success",
    };

    recipe.value = {
      title: '',
      description: '',
      ingredients: '',
      preparation: '',
      tag: ''
    };

    router.push('/myRecipes');
  } catch (err) {
    let message = "Algo deu errado!";

    if (axios.isAxiosError(err) && err.response) {
      message += " " + (err.response.data?.error ?? err.message);

      if (err.response.status === 403) {
        router.push('/login');
      }
    }

    snackbar.value = {
      show: true,
      message,
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
