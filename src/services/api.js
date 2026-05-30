import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getDetritos = async () => {
  try {
    const response = await api.get('/detritos');
    return response.data;
  } catch {
    return mockDetritos;
  }
};

export const getDetritoById = async (id) => {
  try {
    const response = await api.get(`/detritos/${id}`);
    return response.data;
  } catch {
    return mockDetritos.find(d => d.id === id);
  }
};

export const createDetrito = async (detrito) => {
  try {
    const response = await api.post('/detritos', detrito);
    return response.data;
  } catch {
    return { ...detrito, id: Date.now().toString() };
  }
};

export const updateDetrito = async (id, detrito) => {
  try {
    const response = await api.put(`/detritos/${id}`, detrito);
    return response.data;
  } catch {
    return { ...detrito, id };
  }
};

export const deleteDetrito = async (id) => {
  try {
    await api.delete(`/detritos/${id}`);
    return true;
  } catch {
    return true;
  }
};

export const getAlertas = async () => {
  try {
    const response = await api.get('/alertas');
    return response.data;
  } catch {
    return mockAlertas;
  }
};

export const createAlerta = async (alerta) => {
  try {
    const response = await api.post('/alertas', alerta);
    return response.data;
  } catch {
    return { ...alerta, id: Date.now().toString() };
  }
};

export const deleteAlerta = async (id) => {
  try {
    await api.delete(`/alertas/${id}`);
    return true;
  } catch {
    return true;
  }
};