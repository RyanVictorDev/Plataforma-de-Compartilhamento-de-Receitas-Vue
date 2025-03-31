<template>
  <v-app v-if="token != ''">
    <NavBarComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>

  <v-app v-else>
    <v-main class="bg-white">
      <v-container class="mx-auto fill-height d-flex flex-column">
        <v-sheet class="form mx-auto my-auto pa-6 bg-grey-lighten-3 rounded-lg">
          <v-img class="mx-auto mb-6" src="./assets/logoRecipe.png" width="100" />
          <v-form fast-fail @submit.prevent @submit="auth(email, password)">
            <v-text-field
              v-model="email"
              type="email"
              required
              label="Email"
            />

            <v-text-field
              v-model="password"
              label="Senha"
            />

            <v-btn class="mt-2" color="yellow" type="submit" block>Login</v-btn>
          </v-form>

          <p class="mt-3">Test</p>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavBarComponent from './components/NavBarComponent.vue';
import { authenticate } from './boot/axios';

const email = ref('');
const password = ref('');

const auth = async (email: string, password: string) => {
  try {
    await authenticate(email, password);
    token.value = localStorage.getItem('authToken') || '';
  } catch (error) {
    console.log(error);
  }
};

const token = ref('')
</script>

<style scoped>
.form{
  width: 40%;
}
</style>
