import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAPI } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await AsyncStorage.getItem('@spacesense:usuario');
        if (dados) setUsuario(JSON.parse(dados));
      } catch (e) {
        console.log('Erro ao carregar usuário:', e);
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuario();
  }, []);

  async function login(email, senha) {
    try {
      const data = await loginAPI(email, senha);
      const token = data.token || data.accessToken || data;
      await AsyncStorage.setItem('@spacesense:token', token);
      const dados = { email, nome: 'Operador SpaceSense' };
      await AsyncStorage.setItem('@spacesense:usuario', JSON.stringify(dados));
      setUsuario(dados);
      return { sucesso: true };
    } catch (e) {
      // fallback para login demo
      if (email === 'admin@satguard.com' && senha === '123456') {
        const dados = { email, nome: 'Operador SpaceSense' };
        await AsyncStorage.setItem('@spacesense:usuario', JSON.stringify(dados));
        setUsuario(dados);
        return { sucesso: true };
      }
      return { sucesso: false, erro: 'Email ou senha inválidos.' };
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@spacesense:usuario');
    await AsyncStorage.removeItem('@spacesense:token');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}