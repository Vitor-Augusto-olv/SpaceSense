import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { getDetritos, createDetrito, deleteDetrito, updateDetrito } from '../src/services/api';

export default function Detritos() {
  const [detritos, setDetritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('TODOS');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [distancia, setDistancia] = useState('');
  const [risco, setRisco] = useState('MEDIO');
  const [status, setStatus] = useState('ATIVO');

  async function carregar() {
    setLoading(true);
    const data = await getDetritos();
    setDetritos(data);
    setLoading(false);
  }

  useEffect(() => { carregar(); }, []);

  function abrirEdicao(d) {
    setEditando(d);
    setNome(d.nome);
    setTamanho(d.tamanho);
    setDistancia(d.distancia);
    setRisco(d.risco);
    setStatus(d.status);
    setMostrarForm(true);
  }

  function fecharForm() {
    setMostrarForm(false);
    setEditando(null);
    setNome('');
    setTamanho('');
    setDistancia('');
    setRisco('MEDIO');
    setStatus('ATIVO');
  }

  async function handleSalvar() {
    if (!nome || !tamanho || !distancia) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setSalvando(true);
    const dados = { nome, tamanho, distancia, risco, status };

    if (editando) {
      const atualizado = await updateDetrito(editando.id, dados);
      setDetritos(prev => prev.map(d => d.id === editando.id ? atualizado : d));
    } else {
      const novo = await createDetrito(dados);
      setDetritos(prev => [novo, ...prev]);
    }
    fecharForm();
    setSalvando(false);
  }

  async function handleDelete(id) {
    Alert.alert('Remover Detrito', 'Deseja remover este detrito do rastreamento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive', onPress: async () => {
          await deleteDetrito(id);
          setDetritos(prev => prev.filter(d => d.id !== id));
        }
      }
    ]);
  }

  const riscoColor = (r) => ({
    ALTO: colors.danger,
    MEDIO: colors.warning,
    BAIXO: colors.success,
  }[r] || colors.textSecondary);

  const riscoIcone = (r) => ({
    ALTO: 'alert-circle',
    MEDIO: 'warning',
    BAIXO: 'checkmark-circle',
  }[r] || 'help-circle');

  const detritosFiltrados = filtro === 'TODOS'
    ? detritos
    : detritos.filter(d => d.risco === filtro);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Detritos</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setMostrarForm(true)}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Resumo */}
        <View style={styles.resumo}>
          {['ALTO', 'MEDIO', 'BAIXO'].map(r => (
            <View key={r} style={[styles.resumoCard, { borderTopColor: riscoColor(r) }]}>
              <Text style={[styles.resumoValor, { color: riscoColor(r) }]}>
                {detritos.filter(d => d.risco === r).length}
              </Text>
              <Text style={styles.resumoLabel}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Filtros */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosContainer}>
          {['TODOS', 'ALTO', 'MEDIO', 'BAIXO'].map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filtroBtn, filtro === f && { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={() => setFiltro(f)}
            >
              <Text style={[styles.filtroTexto, filtro === f && { color: '#fff', fontWeight: '600' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista */}
        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : detritosFiltrados.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="planet-outline" size={48} color={colors.textMuted} />
            <Text style={styles.vazioTexto}>Nenhum detrito encontrado</Text>
          </View>
        ) : (
          detritosFiltrados.map(d => (
            <View key={d.id} style={[styles.card, { borderLeftColor: riscoColor(d.risco) }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Ionicons name={riscoIcone(d.risco)} size={16} color={riscoColor(d.risco)} />
                  <Text style={styles.cardNome}>{d.nome}</Text>
                </View>
                <View style={styles.cardAcoes}>
                  <TouchableOpacity onPress={() => abrirEdicao(d)} style={styles.acaoBtn}>
                    <Ionicons name="pencil-outline" size={15} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(d.id)} style={styles.acaoBtn}>
                    <Ionicons name="trash-outline" size={15} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.cardInfoRow}>
                <View style={styles.cardInfoItem}>
                  <Ionicons name="resize-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.cardInfoTexto}>{d.tamanho}</Text>
                </View>
                <View style={styles.cardInfoItem}>
                  <Ionicons name="navigate-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.cardInfoTexto}>{d.distancia}</Text>
                </View>
                <View style={styles.cardInfoItem}>
                  <Ionicons name="radio-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.cardInfoTexto}>{d.status}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={[styles.badge, { backgroundColor: riscoColor(d.risco) + '22' }]}>
                  <Text style={[styles.badgeTexto, { color: riscoColor(d.risco) }]}>Risco {d.risco}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: d.status === 'ATIVO' ? colors.success + '22' : colors.textMuted + '22' }]}>
                  <Text style={[styles.badgeTexto, { color: d.status === 'ATIVO' ? colors.success : colors.textMuted }]}>{d.status}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal formulário */}
      <Modal visible={mostrarForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>{editando ? 'Editar Detrito' : 'Novo Detrito'}</Text>
              <TouchableOpacity onPress={fecharForm}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput style={styles.input} placeholder="Nome do detrito" placeholderTextColor={colors.textMuted} value={nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="Tamanho (ex: 10cm)" placeholderTextColor={colors.textMuted} value={tamanho} onChangeText={setTamanho} />
            <TextInput style={styles.input} placeholder="Distância (ex: 200km)" placeholderTextColor={colors.textMuted} value={distancia} onChangeText={setDistancia} />

            <Text style={styles.selectorLabel}>NÍVEL DE RISCO</Text>
            <View style={styles.selector}>
              {['ALTO', 'MEDIO', 'BAIXO'].map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.selectorBtn, risco === r && { backgroundColor: riscoColor(r) + '33', borderColor: riscoColor(r) }]}
                  onPress={() => setRisco(r)}
                >
                  <Text style={[styles.selectorTexto, { color: risco === r ? riscoColor(r) : colors.textMuted }]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.selectorLabel}>STATUS</Text>
            <View style={styles.selector}>
              {['ATIVO', 'INATIVO'].map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.selectorBtn, status === s && { backgroundColor: colors.primary + '33', borderColor: colors.primary }]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.selectorTexto, { color: status === s ? colors.primary : colors.textMuted }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.botao} onPress={handleSalvar} disabled={salvando}>
              {salvando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>{editando ? 'Salvar Alterações' : 'Adicionar Detrito'}</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  filtrosContainer: { marginBottom: 16 },
  filtroBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: colors.border, marginRight: 8, backgroundColor: colors.card },
  filtroTexto: { fontSize: 12, color: colors.textMuted },
  vazio: { alignItems: 'center', marginTop: 60, gap: 12 },
  vazioTexto: { color: colors.textMuted, fontSize: 14 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  cardNome: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, flex: 1 },
  cardAcoes: { flexDirection: 'row', gap: 4 },
  acaoBtn: { padding: 6 },
  cardInfoRow: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  cardInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardInfoTexto: { fontSize: 12, color: colors.textSecondary },
  cardFooter: { flexDirection: 'row', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99 },
  badgeTexto: { fontSize: 11, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, gap: 12 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.textPrimary },
  selectorLabel: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  selector: { flexDirection: 'row', gap: 8 },
  selectorBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  selectorTexto: { fontSize: 12, fontWeight: '600' },
  botao: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 4 },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
});