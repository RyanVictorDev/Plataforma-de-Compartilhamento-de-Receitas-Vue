<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center px-4">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <v-card class="pa-5 bg-transparent text-center" elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            Sobre o Recipe Share
          </v-card-title>

          <v-card-text class="text-body-1 mt-3">
            O <strong>Recipe Share</strong> é uma plataforma criada para amantes da culinária que desejam
            compartilhar e salvar suas receitas favoritas. Nossa missão é conectar pessoas através do sabor e
            facilitar o acesso a pratos incríveis de diversas culturas.
          </v-card-text>

          <v-divider class="my-3" />

          <v-card-text class="text-body-1">
            Como funciona?
            <ul class="text-left mt-2">
              <li>Crie e compartilhe suas próprias receitas.</li>
              <li>Salve receitas de outros usuários para testar depois.</li>
              <li>Explore pratos incríveis recomendados pela comunidade.</li>
            </ul>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/">Explorar Receitas</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
ul {
  padding-left: 1.2rem;
  margin: 0;
}
</style>
