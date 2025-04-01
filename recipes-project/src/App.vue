<template>
  <v-app>
    <NavBarComponent v-if="route.path !== '/login'" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavBarComponent from './components/NavBarComponent.vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped>
</style>
