<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="blue-grey-darken-4">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        :icon="icon.icon"
        density="comfortable"
        variant="text"
        :href="icon.href"
        target="_blank"
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
    {
      icon: 'mdi-github',
      href: 'https://github.com/RyanVictorDev',
    },
    {
      icon: 'mdi-linkedin',
      href: 'https://linkedin.com/in/ryan-victor-dev',
    },
    // {
    //   icon: 'mdi-instagram',
    //   href: 'https://twitter.com/RyanVictorDev',
    // }
  ]
</script>
