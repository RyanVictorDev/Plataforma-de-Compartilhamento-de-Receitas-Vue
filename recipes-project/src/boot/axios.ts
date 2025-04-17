import axios from "axios";

// const api = axios.create({
//   baseURL: 'https://compartilhamento-de-receitas-api.onrender.com',
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

const api = axios.create({
  baseURL: 'http://localhost:8040',
  headers: {
    "Content-Type": "application/json"
  }
});

const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const authenticate = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: password
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.name);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na autenticação:', error.response ? error.response.data : error.message);
    } else {
      console.error('Erro na autenticação:', error);
    }
    throw error;
  }
}

export { api, authenticate };
