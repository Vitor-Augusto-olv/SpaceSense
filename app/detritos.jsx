import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '../src/theme/colors';
import { getDetritos, createDetrito, deleteDetrito } from '../src/services/api';

export default function Detritos() {
  const [detritos, setDetritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [distancia, setDistancia] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    setLoading(true);
    const data = await getDetritos();
    setDetritos(data);
    setLoading(false);
  }

  useEffect(() => { carregar(); }, []);

  async function handleCriar() {
    if (!nome || !tamanho || !distancia) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setSalvando(true);
    const novo = await createDetrito({ nome, tamanho, distancia, risco: 'MEDIO', status: 'ATIVO' });
    setDetritos(prev => [novo, ...prev]);
    setNome('');
    setTamanho('');
    setDistancia('');
    setSalvando(false);
  }

  async function handleDelete(id) {
    Alert.alert('Remover', 'Deseja remover este detrito?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive', onPress: async () => {
          await deleteDetrito(id);
          setDetritos(prev => prev.filter(d => d.id !== id));
        }
      }
    ]);
  }

  const riscoColor = (risco) => ({
    ALTO: colors.danger,
    MEDIO: colors.warning,
    BAIXO: colors.success,
  }[risco] || colors.textSecondary);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Detritos Rastreados</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nome do detrito" placeholderTextColor={colors.textMuted} value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Tamanho (ex: 10cm)" placeholderTextColor={colors.textMuted} value={tamanho} onChangeText={setTamanho} />
        <TextInput style={styles.input} placeholder="Distância (ex: 200km)" placeholderTextColor={colors.textMuted} value={distancia} onChangeText={setDistancia} />
        <TouchableOpacity style={styles.botao} onPress={handleCriar} disabled={salvando}>
          {salvando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>+ Adicionar Detrito</Text>}
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        detritos.map(d => (
          <View key={d.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardNome}>{d.nome}</Text>
              <TouchableOpacity onPress={() => handleDelete(d.id)}>
                <Text style={styles.deletar}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardInfo}>📏 {d.tamanho}  |  📡 {d.distancia}</Text>
            <Text style={[styles.risco, { color: riscoColor(d.risco) }]}>Risco: {d.risco}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 16, marginTop: 8 },
  form: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10, color: colors.textPrimary, marginBottom: 10 },
  botao: { backgroundColor: colors.primary, borderRadius: 8, padding: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 14 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardNome: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  cardInfo: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  risco: { fontSize: 12, fontWeight: 'bold', marginTop: 6 },
  deletar: { color: colors.danger, fontSize: 16 },
});