<template>
  <v-app-bar class="d-flex px-5" :elevation="2" theme="white" color="white">
    <img class="logo" src="../assets/logo.png" alt="">
    <p class="font-weight-bold">RecipeShare</p>

    <v-spacer v-if="display.mobile.value" />

    <div v-if="display.mdAndUp.value" class="d-flex mx-auto ga-3">
      <v-btn class="text-caption" text to="/">Início</v-btn>
      <v-btn class="text-caption" text to="/recipes">Receitas</v-btn>
      <v-btn v-if="isAuthenticated" class="text-caption" text to="/recipesSubmit">Enviar Receita</v-btn>
      <v-btn class="text-caption" text to="/about">Sobre</v-btn>
    </div>

    <div v-if="display.mdAndUp.value">
      <v-btn v-if="!isAuthenticated" class="bg-orange-darken-1 text-white text-caption" outlined to="/login">
        Entrar
      </v-btn>

      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn
            color="white text-red text-body-2"
            icon="mdi-heart-outline"
            variant="plain"
            to="/favorites"
          />
          <v-btn v-bind="props" class="bg-orange-darken-1 text-white text-caption" rounded>
            <v-icon left>mdi-account</v-icon>
            Perfil
          </v-btn>
        </template>
        <v-list class="bg-white">
          <v-list-item to="/profile">
            <v-list-item-title><v-icon left>mdi-account</v-icon> Meu Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item to="/myRecipes">
            <v-list-item-title><v-icon left>mdi-chef-hat</v-icon> Minhas Receitas</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title><v-icon left>mdi-logout</v-icon> Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div v-else>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="bg-orange-darken-1 text-white text-caption" rounded>
            <v-icon left>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list class="bg-white">
          <v-list-item to="/">
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item>
          <v-list-item to="/recipes">
            <v-list-item-title>Receitas</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/recipesSubmit">
            <v-list-item-title>Enviar Receita</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn v-if="!isAuthenticated" class="bg-orange-darken-1 text-white text-caption" outlined to="/login">
              Entrar
            </v-btn>
            <v-menu v-else>
              <template v-slot:activator="{ props }">
                <v-list-item-title v-bind="props">Perfil</v-list-item-title>
              </template>
              <v-list class="bg-white">
                <v-list-item to="/profile">
                  <v-list-item-title><v-icon left>mdi-account</v-icon> Meu Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item to="/myRecipes">
                  <v-list-item-title><v-icon left>mdi-chef-hat</v-icon> Minhas Receitas</v-list-item-title>
                </v-list-item>
                <v-list-item to="/favorites">
                  <v-list-item-title><v-icon left>mdi-heart-outline</v-icon> Favoritos</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title><v-icon left>mdi-logout</v-icon> Sair</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify';

const display = useDisplay();

const token = ref<string | null>(null)

const isAuthenticated = computed(() => !!token.value)

onMounted(() => {
  token.value = localStorage.getItem('authToken')
})

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  token.value = null
  window.location.reload()
}
</script>

<style lang="css" scoped>
.logo {
  max-width: 3rem;
  max-height: auto;
}
</style>
