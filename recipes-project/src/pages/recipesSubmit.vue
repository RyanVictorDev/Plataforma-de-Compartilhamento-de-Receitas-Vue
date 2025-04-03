<template>
  <div class="d-flex flex-column teste">
    <SubmitRecipeFormComponent />
  </div>
</template>

<script setup lang="ts">
import SubmitRecipeFormComponent from '@/components/SubmitRecipeFormComponent.vue';
</script>

<style scoped>
.teste{
  background-image: url('@/assets/wallpaper.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
