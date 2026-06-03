import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://c-a-v-enterprise.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor — coloca o token JWT em toda requisição
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@spacesense:token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- MOCK DATA (fallback se API falhar) ----
const mockDetritos = [
  { id: '1', nome: 'Detrito A-001', tamanho: '10cm', risco: 'ALTO', distancia: '120km', status: 'ATIVO' },
  { id: '2', nome: 'Detrito B-042', tamanho: '5cm', risco: 'MEDIO', distancia: '340km', status: 'ATIVO' },
  { id: '3', nome: 'Detrito C-117', tamanho: '2cm', risco: 'BAIXO', distancia: '890km', status: 'INATIVO' },
];

const mockAlertas = [
  { id: '1', titulo: 'Aproximação crítica', descricao: 'Detrito A-001 a menos de 150km', nivel: 'DANGER', data: '2025-06-01T10:30:00' },
  { id: '2', titulo: 'Alerta moderado', descricao: 'Detrito B-042 mudou trajetória', nivel: 'WARNING', data: '2025-06-01T08:15:00' },
  { id: '3', titulo: 'Zona segura', descricao: 'Detrito C-117 afastando', nivel: 'SAFE', data: '2025-05-31T22:00:00' },
];

// ---- Mapear resposta da API para formato do app ----
function mapDetrito(d) {
  const risco = d.detritoRiscoColisao >= 70 ? 'ALTO' : d.detritoRiscoColisao >= 40 ? 'MEDIO' : 'BAIXO';
  return {
    id: String(d.id),
    nome: `Detrito #${d.id}`,
    tamanho: `${d.detritoTamanho}m`,
    risco,
    distancia: d.orbita?.orbitaAltitudeKm ? `${d.orbita.orbitaAltitudeKm}km` : 'N/A',
    status: 'ATIVO',
    velocidade: d.velocidade,
  };
}

function mapAlerta(a) {
  const nivel = a.alertaNivel === 'A' ? 'DANGER'
    : a.alertaNivel === 'M' ? 'WARNING' : 'SAFE';
  return {
    id: String(a.alertaId),
    titulo: `Alerta ${a.alertaNivel === 'A' ? 'Crítico' : a.alertaNivel === 'M' ? 'Moderado' : 'Informativo'}`,
    descricao: a.alertaDescricao || 'Sem descrição',
    nivel,
    data: a.alertaData,
  };
}

// ---- AUTH ----
export const loginAPI = async (email, senha) => {
  const response = await api.post('/auth/login', { email, senha });
  return response.data;
};

// ---- DETRITOS ----
export const getDetritos = async () => {
  try {
    const response = await api.get('/api/detritoespacials');
    console.log('Resposta API detritos:', JSON.stringify(response.data));
    const lista = response.data?._embedded?.detritoEspacialList || response.data?.content || [];
    return lista.map(mapDetrito);
  } catch (e) {
    console.log('Erro detritos:', e.message);
    return mockDetritos;
  }
};

export const getDetritoById = async (id) => {
  try {
    const response = await api.get(`/api/detritoespacials/${id}`);
    return mapDetrito(response.data);
  } catch {
    return mockDetritos.find(d => d.id === id);
  }
};

export const createDetrito = async (detrito) => {
  try {
    const body = {
      velocidade: 0,
      detritoTamanho: parseFloat(detrito.tamanho) || 0,
      detritoRiscoColisao: detrito.risco === 'ALTO' ? 80 : detrito.risco === 'MEDIO' ? 50 : 20,
      orbita: { orbitaId: 1 },
    };
    const response = await api.post('/api/detritoespacials', body);
    return mapDetrito(response.data);
  } catch {
    return { ...detrito, id: Date.now().toString() };
  }
};

export const updateDetrito = async (id, detrito) => {
  try {
    const body = {
      velocidade: 0,
      detritoTamanho: parseFloat(detrito.tamanho) || 0,
      detritoRiscoColisao: detrito.risco === 'ALTO' ? 80 : detrito.risco === 'MEDIO' ? 50 : 20,
      orbita: { orbitaId: 1 },
    };
    const response = await api.put(`/api/detritoespacials/${id}`, body);
    return mapDetrito(response.data);
  } catch {
    return { ...detrito, id };
  }
};

export const deleteDetrito = async (id) => {
  try {
    await api.delete(`/api/detritoespacials/${id}`);
    return true;
  } catch {
    return true;
  }
};

// ---- ALERTAS ----
export const getAlertas = async () => {
  try {
    const response = await api.get('/api/alertas');
    const lista = response.data?._embedded?.alertaList || response.data?.content || [];
    return lista.map(mapAlerta);
  } catch {
    return mockAlertas;
  }
};

export const createAlerta = async (alerta) => {
  try {
    const body = {
      alertaNivel: alerta.nivel === 'DANGER' ? 'ALTO' : alerta.nivel === 'WARNING' ? 'MEDIO' : 'BAIXO',
      alertaDescricao: alerta.descricao,
      alertaData: new Date().toISOString(),
    };
    const response = await api.post('/api/alertas', body);
    return mapAlerta(response.data);
  } catch {
    return { ...alerta, id: Date.now().toString() };
  }
};

export const deleteAlerta = async (id) => {
  try {
    await api.delete(`/api/alertas/${id}`);
    return true;
  } catch {
    return true;
  }
};