<template>
  <v-main class="bg-white fill-height">
    <v-container v-if="!haveAAccount" class="mx-auto fill-height d-flex flex-column">
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.message }}
      </v-snackbar>

      <v-sheet class="form mx-auto my-auto pa-6 bg-grey-lighten-3 rounded-lg" :elevation="10">
        <v-img class="mx-auto mb-6" src="../assets/logo.png" width="100" />
        <v-form fast-fail @submit.prevent @submit="auth(email, password)">
          <v-text-field
            v-model="email"
            type="email"
            required
            label="Email"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="password"
            type="password"
            label="Senha"
            :rules="[rules.required]"
          />

          <v-btn class="mt-2" color="yellow" type="submit" block>Login</v-btn>
        </v-form>

        <p class="mt-3 text-blue-darken-3" @click="createAAccount">Não possui uma conta? Crie uma</p>
      </v-sheet>
    </v-container>

    <v-container v-else class="mx-auto fill-height d-flex flex-column">
      <v-sheet class="form mx-auto my-auto pa-6 bg-grey-lighten-3 rounded-lg" :elevation="10">
        <v-img class="mx-auto mb-6" src="../assets/logo.png" width="100" />
        <v-form fast-fail @submit.prevent @submit="register(name, email, password)">
          <v-text-field
            v-model="name"
            required
            label="Nome"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="email"
            type="email"
            required
            label="Email"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="password"
            type="password"
            label="Senha"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="passwordConfirm"
            type="password"
            label="Confirmar senha"
            :rules="[rules.required, rules.matchPassword]"
          />

          <v-btn class="mt-2" color="yellow" type="submit" block>Criar conta</v-btn>
        </v-form>

        <p class="mt-3 text-blue-darken-3" @click="createAAccount">Já possuo uma conta</p>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authenticate, api } from '../boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});

const rules = {
  required: (value: string) => !!value || 'Campo obrigatório',
  matchPassword: (value: string) => value === password.value || 'As senhas não coincidem',
};

const haveAAccount = ref(false);

const createAAccount = () => {
  haveAAccount.value = !haveAAccount.value;
}

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const auth = async (email: string, password: string) => {
  try {
    await authenticate(email, password);
    router.push('/');
  } catch (error) {
    console.log(error);
    snackbar.value = {
      show: true,
      message: "Erro na autentificação!",
      color: "red",
    };
  }
};

const register = async (name: string, email: string, password:string) => {
  try {
    await api.post('/user', {
      name: name,
      email: email,
      password: password
    });
    haveAAccount.value = !haveAAccount.value;

  } catch (error) {
    console.log(error)
      snackbar.value = {
      show: true,
      message: "Algo deu errado!",
      color: "red",
    };
  }
}
</script>

<style scoped>
.form{
  width: 40%;
}
</style>
