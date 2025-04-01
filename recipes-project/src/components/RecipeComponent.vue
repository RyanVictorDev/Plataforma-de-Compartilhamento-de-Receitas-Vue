<template>
  <v-sheet
    class="d-flex flex-column align-left pa-3 text-center mx-auto"
    color="grey-lighten-5"
    elevation="3"
    width="255"
    rounded="lg"
  >
    <div class="d-flex justify-space-between align-center mb-3">
      <v-chip
        class="tag align-left text-caption"
        :color="tagColor"
        label
      >
        <v-icon icon="mdi-label" start></v-icon>
        {{ tag }}
      </v-chip>

      <v-icon
        class="my-auto"
        color="red"
        icon="mdi-heart-outline"
        size="20"
      />
    </div>

    <p class="text-body-1 text-left font-weight-bold mb-2">{{ title }}</p>

    <p class="mb-4 text-left text-body-2">{{ description }}</p>

    <v-divider class="mb-4" />

    <v-btn color="grey-lighten-4" class="text-yellow-darken-4">
      Ver receita
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
});

const tagColor = computed(() => {
  const colors: Record<string, string> = {
    BREAKFAST: 'orange',
    LUNCH: 'blue',
    DINNER: 'orange-darken-2',
    VEGAN: 'green',
    VEGETARIAN: 'light-green',
  };

  return colors[props.tag.toUpperCase()] || 'grey';
});
</script>

<style>
.tag {
  max-width: fit-content;
}
</style>
