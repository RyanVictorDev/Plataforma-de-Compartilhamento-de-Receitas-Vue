import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('authToken'));
  const showLogin = ref(false);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    isAuthenticated.value = true;
    showLogin.value = false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
  };

  return { isAuthenticated, showLogin, login, logout };
});
