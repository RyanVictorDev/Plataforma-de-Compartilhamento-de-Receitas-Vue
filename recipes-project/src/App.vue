<template>
  <v-app>
    <NavBarComponent v-if="route.path !== '/login'" />
    <v-main class="bg-white">
      <router-view />
    </v-main>
    <FooterComponent v-if="route.path !== '/login'" />
  </v-app>
</template>

<script lang="ts" setup>
import NavBarComponent from './components/NavBarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped>
</style>
