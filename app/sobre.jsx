import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';

export default function Sobre() {
  const integrantes = [
    { nome: 'Vitor Augusto Oliveira de Abreu', rm: 'RM564227', turma: '2TDSPJ', inicial: 'V' },
    { nome: 'André Bellandi Vital Rodrigues', rm: 'RM564662', turma: '2TDSPJ', inicial: 'A' },
    { nome: 'Gabriel Garcia Mayo Delatore', rm: 'RM563298', turma: '2TDSPJ', inicial: 'G' },
  ];

  const tecnologias = [
    { icone: 'phone-portrait-outline', nome: 'React Native', desc: 'App mobile multiplataforma', cor: colors.primary },
    { icone: 'navigate-outline', nome: 'Expo Router', desc: 'Navegação entre telas', cor: colors.secondary },
    { icone: 'cloud-outline', nome: 'Axios + API REST', desc: 'Integração com backend Java', cor: colors.success },
    { icone: 'hardware-chip-outline', nome: 'ESP32 + Wokwi', desc: 'Protótipo IoT simulado', cor: colors.warning },
    { icone: 'wifi-outline', nome: 'MQTT / WebServer', desc: 'Comunicação em tempo real', cor: colors.danger },
    { icone: 'globe-outline', nome: 'Space-Track.org', desc: 'Dados reais de detritos', cor: '#A78BFA' },
  ];

  const links = [
    { icone: 'logo-github', label: 'Repositório GitHub', url: 'https://github.com/Vitor-Augusto-olv/SpaceSense' },
    { icone: 'globe-outline', label: 'Space-Track.org', url: 'https://www.space-track.org' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.logo}>🛰</Text>
        <Text style={styles.nome}>Space Sense</Text>
        <Text style={styles.versao}>v1.0.0 — FIAP Global Solution 2025</Text>
        <View style={styles.heroBadge}>
          <Ionicons name="shield-checkmark" size={12} color={colors.success} />
          <Text style={styles.heroBadgeTexto}>Sistema Operacional</Text>
        </View>
      </View>

      {/* Missão */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="rocket-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>MISSÃO</Text>
        </View>
        <Text style={styles.missaoTexto}>
          O Space Sense é uma solução inovadora de monitoramento de detritos espaciais que combina IoT com ESP32 e inteligência mobile para prevenção de colisões em órbita terrestre. O sistema rastreia detritos em tempo real, emite alertas de risco e auxilia operadores na tomada de decisões críticas para proteção de satélites ativos.
        </Text>
        <View style={styles.missaoStats}>
          <View style={styles.missaoStat}>
            <Text style={styles.missaoStatValor}>27.000+</Text>
            <Text style={styles.missaoStatLabel}>Detritos rastreados globalmente</Text>
          </View>
          <View style={styles.missaoStatDiv} />
          <View style={styles.missaoStat}>
            <Text style={styles.missaoStatValor}>550km</Text>
            <Text style={styles.missaoStatLabel}>Altitude média de monitoramento</Text>
          </View>
        </View>
      </View>

      {/* Integrantes */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="people-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>EQUIPE</Text>
        </View>
        {integrantes.map((i, index) => (
          <View key={index} style={styles.integranteCard}>
            <View style={styles.integranteAvatar}>
              <Text style={styles.integranteInicial}>{i.inicial}</Text>
            </View>
            <View style={styles.integranteInfo}>
              <Text style={styles.integranteNome}>{i.nome}</Text>
              <View style={styles.integranteBadges}>
                <View style={styles.rmBadge}>
                  <Text style={styles.rmTexto}>{i.rm}</Text>
                </View>
                <View style={styles.turmaBadge}>
                  <Text style={styles.turmaTexto}>{i.turma}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Tecnologias */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="code-slash-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>TECNOLOGIAS</Text>
        </View>
        <View style={styles.techGrid}>
          {tecnologias.map((t, i) => (
            <View key={i} style={[styles.techCard, { borderTopColor: t.cor }]}>
              <Ionicons name={t.icone} size={20} color={t.cor} />
              <Text style={styles.techNome}>{t.nome}</Text>
              <Text style={styles.techDesc}>{t.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Links */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="link-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>LINKS</Text>
        </View>
        {links.map((l, i) => (
          <TouchableOpacity key={i} style={styles.linkCard} onPress={() => Linking.openURL(l.url)}>
            <Ionicons name={l.icone} size={18} color={colors.primary} />
            <Text style={styles.linkTexto}>{l.label}</Text>
            <Ionicons name="open-outline" size={14} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.rodape}>Desenvolvido com 🚀 para FIAP Global Solution 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  hero: { alignItems: 'center', marginTop: 16, marginBottom: 28 },
  logo: { fontSize: 60, marginBottom: 8 },
  nome: { fontSize: 30, fontWeight: 'bold', color: colors.textPrimary },
  versao: { fontSize: 12, color: colors.textMuted, marginTop: 4, marginBottom: 10 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.success + '22', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 99 },
  heroBadgeTexto: { fontSize: 12, color: colors.success, fontWeight: '600' },
  secao: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  secaoHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  missaoTexto: { fontSize: 13, color: colors.textSecondary, lineHeight: 22, marginBottom: 16 },
  missaoStats: { flexDirection: 'row', alignItems: 'center' },
  missaoStat: { flex: 1, alignItems: 'center' },
  missaoStatValor: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  missaoStatLabel: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
  missaoStatDiv: { width: 1, height: 40, backgroundColor: colors.border },
  integranteCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  integranteAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary + '33', borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  integranteInicial: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  integranteInfo: { flex: 1 },
  integranteNome: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  integranteBadges: { flexDirection: 'row', gap: 6 },
  rmBadge: { backgroundColor: colors.primary + '22', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  rmTexto: { fontSize: 11, color: colors.primary, fontWeight: '600' },
  turmaBadge: { backgroundColor: colors.border, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  turmaTexto: { fontSize: 11, color: colors.textMuted },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techCard: { width: '47.5%', backgroundColor: colors.background, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: colors.border, borderTopWidth: 3, gap: 4 },
  techNome: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  techDesc: { fontSize: 11, color: colors.textMuted },
  linkCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: colors.background, borderRadius: 8, borderWidth: 1, borderColor: colors.border, marginBottom: 8 },
  linkTexto: { fontSize: 14, color: colors.textPrimary },
  rodape: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginBottom: 32, marginTop: 8 },
});