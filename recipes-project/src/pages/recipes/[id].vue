<template>
  <div class="d-flex flex-column bg-grey-lighten-3">
    <v-btn
      class="teste ml-8 mt-6 bg-orange-darken-3"
      icon="mdi-arrow-left"
      @click="$router.back()"
    />
    <RecipePageComponent :id="id" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import RecipePageComponent from '@/components/RecipePageComponent.vue';

const route = useRoute();

const id = route.params.id as string;
</script>

<style scoped>
.bgImage{
  background-image: url('@/assets/wallpaper.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.teste{
  position: fixed;
}
</style>
