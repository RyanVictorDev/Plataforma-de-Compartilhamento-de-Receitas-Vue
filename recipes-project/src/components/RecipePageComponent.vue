<template>
  <v-container class="mx-auto fill-height d-flex flex-column align-center justify-center">
    <v-card class="pa-5 form bg-white" elevation="3">
      <p class="mb-6 text-center text-h5 font-weight-bold">{{ recipe.title }}</p>

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
        <!-- <v-col class="mx-auto" cols="9" md="3">
          <v-btn class="btn mt-4" color="yellow-darken-3" type="submit" block>
            Criar Receita
          </v-btn>
        </v-col> -->
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from '@/boot/axios';

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

const recipe = ref({
  title: '',
  description: '',
  ingredients: '',
  preparation: '',
  tag: ''
});

const tagOptions = ref([
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'VEGAN',
  'VEGETARIAN'
]);
</script>

<style scoped>
.form {
  width: 80%;
}
</style>
