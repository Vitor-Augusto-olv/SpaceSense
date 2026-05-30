import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { getDetritos, getAlertas } from '../src/services/api';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const [detritos, setDetritos] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      const d = await getDetritos();
      const a = await getAlertas();
      setDetritos(d);
      setAlertas(a);
      setLoading(false);
    }
    carregar();
  }, []);

  const totalRiscoAlto = detritos.filter(d => d.risco === 'ALTO').length;
  const totalRiscoMedio = detritos.filter(d => d.risco === 'MEDIO').length;
  const totalRiscoBaixo = detritos.filter(d => d.risco === 'BAIXO').length;
  const total = detritos.length || 1;
  const ultimoAlerta = alertas[0];

  const nivelColor = (nivel) => ({
    DANGER: colors.danger,
    WARNING: colors.warning,
    SAFE: colors.success,
  }[nivel] || colors.primary);

  const barras = [
    { label: 'Alto', valor: totalRiscoAlto, cor: colors.danger },
    { label: 'Médio', valor: totalRiscoMedio, cor: colors.warning },
    { label: 'Baixo', valor: totalRiscoBaixo, cor: colors.success },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Space Sense</Text>
          <Text style={styles.subtitulo}>Monitoramento de Detritos Espaciais</Text>
        </View>
        <View style={styles.statusDot} />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 60 }} size="large" />
      ) : (
        <>
          <View style={styles.grid}>
            <View style={[styles.gridCard, { borderTopColor: colors.primary }]}>
              <Ionicons name="planet-outline" size={22} color={colors.primary} />
              <Text style={styles.gridValor}>{detritos.length}</Text>
              <Text style={styles.gridLabel}>Rastreados</Text>
            </View>
            <View style={[styles.gridCard, { borderTopColor: colors.danger }]}>
              <Ionicons name="alert-circle-outline" size={22} color={colors.danger} />
              <Text style={[styles.gridValor, { color: colors.danger }]}>{totalRiscoAlto}</Text>
              <Text style={styles.gridLabel}>Risco Alto</Text>
            </View>
            <View style={[styles.gridCard, { borderTopColor: colors.warning }]}>
              <Ionicons name="warning-outline" size={22} color={colors.warning} />
              <Text style={[styles.gridValor, { color: colors.warning }]}>{totalRiscoMedio}</Text>
              <Text style={styles.gridLabel}>Risco Médio</Text>
            </View>
            <View style={[styles.gridCard, { borderTopColor: colors.success }]}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.success} />
              <Text style={[styles.gridValor, { color: colors.success }]}>ON</Text>
              <Text style={styles.gridLabel}>Sistema</Text>
            </View>
          </View>

          {/* Gráfico manual de barras */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>DISTRIBUIÇÃO DE RISCO</Text>
            <View style={styles.chartCard}>
              {barras.map((b, i) => (
                <View key={i} style={styles.barraRow}>
                  <Text style={styles.barraLabel}>{b.label}</Text>
                  <View style={styles.barraTrack}>
                    <View style={[styles.barraFill, {
                      width: `${(b.valor / total) * 100}%`,
                      backgroundColor: b.cor,
                      minWidth: b.valor > 0 ? 8 : 0,
                    }]} />
                  </View>
                  <Text style={[styles.barraValor, { color: b.cor }]}>{b.valor}</Text>
                </View>
              ))}
            </View>
          </View>

          {ultimoAlerta && (
            <View style={styles.secao}>
              <Text style={styles.secaoTitulo}>ÚLTIMO ALERTA</Text>
              <TouchableOpacity
                style={[styles.alertaCard, { borderLeftColor: nivelColor(ultimoAlerta.nivel) }]}
                onPress={() => router.push('/alertas')}
              >
                <View style={styles.alertaHeader}>
                  <Ionicons name="warning-outline" size={16} color={nivelColor(ultimoAlerta.nivel)} />
                  <Text style={styles.alertaTitulo}>{ultimoAlerta.titulo}</Text>
                </View>
                <Text style={styles.alertaDesc}>{ultimoAlerta.descricao}</Text>
                <Text style={[styles.alertaNivel, { color: nivelColor(ultimoAlerta.nivel) }]}>
                  {ultimoAlerta.nivel}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <Text style={styles.secaoTitulo}>DETRITOS RECENTES</Text>
              <TouchableOpacity onPress={() => router.push('/detritos')}>
                <Text style={styles.verTodos}>Ver todos →</Text>
              </TouchableOpacity>
            </View>
            {detritos.slice(0, 3).map(d => (
              <View key={d.id} style={styles.detritoRow}>
                <Ionicons name="radio-button-on-outline" size={14} color={
                  d.risco === 'ALTO' ? colors.danger :
                  d.risco === 'MEDIO' ? colors.warning : colors.success
                } />
                <Text style={styles.detritoNome}>{d.nome}</Text>
                <Text style={styles.detritoInfo}>{d.distancia}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },
  subtitulo: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  gridCard: {
    width: '47.5%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    alignItems: 'flex-start',
    gap: 6,
  },
  gridValor: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  gridLabel: { fontSize: 12, color: colors.textMuted },
  secao: { marginBottom: 24 },
  secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' },
  verTodos: { fontSize: 12, color: colors.primary },
  chartCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 14,
  },
  barraRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  barraLabel: { width: 40, fontSize: 12, color: colors.textSecondary },
  barraTrack: {
    flex: 1,
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 99,
    overflow: 'hidden',
  },
  barraFill: { height: '100%', borderRadius: 99 },
  barraValor: { width: 20, fontSize: 12, fontWeight: 'bold', textAlign: 'right' },
  alertaCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
  },
  alertaHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  alertaTitulo: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  alertaDesc: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  alertaNivel: { fontSize: 11, fontWeight: 'bold' },
  detritoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detritoNome: { flex: 1, fontSize: 13, color: colors.textPrimary },
  detritoInfo: { fontSize: 12, color: colors.textMuted },
});