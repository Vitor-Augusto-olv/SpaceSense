import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { getAlertas, deleteAlerta, createAlerta } from '../src/services/api';

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('TODOS');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivel, setNivel] = useState('WARNING');
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    setLoading(true);
    const data = await getAlertas();
    setAlertas(data);
    setLoading(false);
  }

  useEffect(() => { carregar(); }, []);

  async function handleDelete(id) {
    Alert.alert('Remover Alerta', 'Deseja remover este alerta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive', onPress: async () => {
          await deleteAlerta(id);
          setAlertas(prev => prev.filter(a => a.id !== id));
        }
      }
    ]);
  }

  async function handleCriar() {
    if (!titulo || !descricao) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setSalvando(true);
    const novo = await createAlerta({ titulo, descricao, nivel, data: new Date().toISOString() });
    setAlertas(prev => [novo, ...prev]);
    setTitulo('');
    setDescricao('');
    setNivel('WARNING');
    setMostrarForm(false);
    setSalvando(false);
  }

  const nivelColor = (nivel) => ({
    DANGER: colors.danger,
    WARNING: colors.warning,
    SAFE: colors.success,
  }[nivel] || colors.textSecondary);

  const nivelIcone = (nivel) => ({
    DANGER: 'alert-circle',
    WARNING: 'warning',
    SAFE: 'checkmark-circle',
  }[nivel] || 'information-circle');

  const alertasFiltrados = filtro === 'TODOS'
    ? alertas
    : alertas.filter(a => a.nivel === filtro);

  const filtros = ['TODOS', 'DANGER', 'WARNING', 'SAFE'];

  function formatarData(dataStr) {
    if (!dataStr) return '';
    const d = new Date(dataStr);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Alertas</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setMostrarForm(!mostrarForm)}
        >
          <Ionicons name={mostrarForm ? 'close' : 'add'} size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <View style={styles.resumo}>
        {['DANGER', 'WARNING', 'SAFE'].map(n => (
          <View key={n} style={[styles.resumoCard, { borderTopColor: nivelColor(n) }]}>
            <Text style={[styles.resumoValor, { color: nivelColor(n) }]}>
              {alertas.filter(a => a.nivel === n).length}
            </Text>
            <Text style={styles.resumoLabel}>{n}</Text>
          </View>
        ))}
      </View>

      {/* Formulário novo alerta */}
      {mostrarForm && (
        <View style={styles.form}>
          <Text style={styles.formTitulo}>NOVO ALERTA</Text>
          <TextInput
            style={styles.input}
            placeholder="Título do alerta"
            placeholderTextColor={colors.textMuted}
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor={colors.textMuted}
            value={descricao}
            onChangeText={setDescricao}
          />
          <View style={styles.nivelSelector}>
            {['DANGER', 'WARNING', 'SAFE'].map(n => (
              <TouchableOpacity
                key={n}
                style={[styles.nivelBtn, nivel === n && { backgroundColor: nivelColor(n) + '33', borderColor: nivelColor(n) }]}
                onPress={() => setNivel(n)}
              >
                <Text style={[styles.nivelBtnTexto, { color: nivel === n ? nivelColor(n) : colors.textMuted }]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.botao} onPress={handleCriar} disabled={salvando}>
            {salvando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Criar Alerta</Text>}
          </TouchableOpacity>
        </View>
      )}

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosContainer}>
        {filtros.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroBtn, filtro === f && styles.filtroBtnAtivo]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.filtroTexto, filtro === f && styles.filtroTextoAtivo]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : alertasFiltrados.length === 0 ? (
        <View style={styles.vazio}>
          <Ionicons name="checkmark-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.vazioTexto}>Nenhum alerta encontrado</Text>
        </View>
      ) : (
        alertasFiltrados.map(alerta => (
          <View key={alerta.id} style={[styles.card, { borderLeftColor: nivelColor(alerta.nivel) }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons name={nivelIcone(alerta.nivel)} size={16} color={nivelColor(alerta.nivel)} />
                <Text style={styles.cardTitulo}>{alerta.titulo}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(alerta.id)}>
                <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDesc}>{alerta.descricao}</Text>
            <View style={styles.cardFooter}>
              <View style={[styles.nivelBadge, { backgroundColor: nivelColor(alerta.nivel) + '22' }]}>
                <Text style={[styles.nivelBadgeTexto, { color: nivelColor(alerta.nivel) }]}>{alerta.nivel}</Text>
              </View>
              {alerta.data && (
                <Text style={styles.cardData}>{formatarData(alerta.data)}</Text>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
  addBtn: { backgroundColor: colors.primary, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  resumo: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  resumoCard: { flex: 1, backgroundColor: colors.card, borderRadius: 10, padding: 12, alignItems: 'center', borderTopWidth: 3, borderWidth: 1, borderColor: colors.border },
  resumoValor: { fontSize: 22, fontWeight: 'bold' },
  resumoLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  form: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border, gap: 10 },
  formTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10, color: colors.textPrimary },
  nivelSelector: { flexDirection: 'row', gap: 8 },
  nivelBtn: { flex: 1, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  nivelBtnTexto: { fontSize: 12, fontWeight: '600' },
  botao: { backgroundColor: colors.primary, borderRadius: 8, padding: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '600' },
  filtrosContainer: { marginBottom: 16 },
  filtroBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: colors.border, marginRight: 8, backgroundColor: colors.card },
  filtroBtnAtivo: { backgroundColor: colors.primary, borderColor: colors.primary },
  filtroTexto: { fontSize: 12, color: colors.textMuted },
  filtroTextoAtivo: { color: '#fff', fontWeight: '600' },
  vazio: { alignItems: 'center', marginTop: 60, gap: 12 },
  vazioTexto: { color: colors.textMuted, fontSize: 14 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  cardTitulo: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, flex: 1 },
  cardDesc: { fontSize: 13, color: colors.textSecondary, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nivelBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99 },
  nivelBadgeTexto: { fontSize: 11, fontWeight: '600' },
  cardData: { fontSize: 11, color: colors.textMuted },
});