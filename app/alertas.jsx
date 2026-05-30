import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '../src/theme/colors';
import { getAlertas, deleteAlerta } from '../src/services/api';

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const nivelColor = (nivel) => ({
    DANGER: colors.danger,
    WARNING: colors.warning,
    SAFE: colors.success,
  }[nivel] || colors.textSecondary);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Alertas Ativos</Text>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : alertas.length === 0 ? (
        <Text style={styles.vazio}>Nenhum alerta registrado.</Text>
      ) : (
        alertas.map(alerta => (
          <View key={alerta.id} style={[styles.card, { borderLeftColor: nivelColor(alerta.nivel) }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitulo}>{alerta.titulo}</Text>
              <TouchableOpacity onPress={() => handleDelete(alerta.id)}>
                <Text style={styles.deletar}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDesc}>{alerta.descricao}</Text>
            <Text style={[styles.nivel, { color: nivelColor(alerta.nivel) }]}>{alerta.nivel}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 16, marginTop: 8 },
  vazio: { color: colors.textMuted, textAlign: 'center', marginTop: 40 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitulo: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  cardDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  nivel: { fontSize: 12, fontWeight: 'bold', marginTop: 8 },
  deletar: { color: colors.danger, fontSize: 16, paddingHorizontal: 4 },
});