import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // Quando a API estiver pronta, substituir por chamada real
    if (email === 'admin@spacesense.com' && senha === '123456') {
      const dados = { email, nome: 'Operador SpaceSense' };
      await AsyncStorage.setItem('@spacesense:usuario', JSON.stringify(dados));
      setUsuario(dados);
      return { sucesso: true };
    }
    return { sucesso: false, erro: 'Email ou senha inválidos.' };
  }

  async function logout() {
    await AsyncStorage.removeItem('@spacesense:usuario');
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