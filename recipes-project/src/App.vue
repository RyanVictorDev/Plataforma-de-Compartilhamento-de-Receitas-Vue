<template>
  <v-app>
    <NavBarComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import NavBarComponent from './components/NavBarComponent.vue';
  //
</script>
