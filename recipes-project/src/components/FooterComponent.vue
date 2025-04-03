<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="blue-grey-darken-4">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      />
    </div>

    <v-divider class="my-2" thickness="2" width="50" />

    <div class="text-caption font-weight-regular opacity-60">
      Todos os direitos resevados para Ryan Victor, desenvolvedor deste projeto.
    </div>

    <v-divider />

    <div>
      {{ new Date().getFullYear() }} — <strong>Ryan Victor</strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  const icons = [
    'mdi-github',
    'mdi-linkedin',
    'mdi-instagram',
  ]
</script>
