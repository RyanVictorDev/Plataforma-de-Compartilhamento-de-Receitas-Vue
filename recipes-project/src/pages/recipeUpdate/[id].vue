<template>
  <div class="d-flex flex-column bgImage">
    <UpdateRecipeFormComponent :id="id" />
  </div>
</template>

<script lang="ts" setup>
import UpdateRecipeFormComponent from '@/components/UpdateRecipeFormComponent.vue';
import { useRoute } from 'vue-router';

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
</style>
