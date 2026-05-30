import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../src/theme/colors';

export default function Sobre() {
  const integrantes = [
    { nome: 'Vitor', rm: 'RM564227', turma: '2TDSPJ' },
    { nome: 'André', rm: 'RM564662', turma: '2TDSPJ' },
    { nome: 'Gabriel', rm: 'RM563298', turma: '2TDSPJ' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>🛰</Text>
      <Text style={styles.nome}>Space Sense</Text>
      <Text style={styles.versao}>v1.0.0 — Global Solution FIAP 2025</Text>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>SOBRE O PROJETO</Text>
        <Text style={styles.descricao}>
          O Space Sense é uma solução de monitoramento de detritos espaciais que combina IoT com ESP32 e um aplicativo mobile para prevenção de colisões em órbita terrestre. O sistema rastreia detritos em tempo real, emite alertas e auxilia na tomada de decisões para proteção de satélites ativos.
        </Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>INTEGRANTES</Text>
        {integrantes.map((i, index) => (
          <View key={index} style={styles.integrante}>
            <Text style={styles.integranteNome}>{i.nome}</Text>
            <Text style={styles.integranteInfo}>{i.rm} · {i.turma}</Text>
          </View>
        ))}
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>TECNOLOGIAS</Text>
        {['React Native + Expo Router', 'Axios + API REST Java', 'ESP32 + Wokwi', 'MQTT / WebServer'].map((t, i) => (
          <Text key={i} style={styles.tech}>▸ {t}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  logo: { fontSize: 52, textAlign: 'center', marginTop: 20 },
  nome: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center', marginTop: 8 },
  versao: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginBottom: 28 },
  secao: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },
  descricao: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  integrante: { marginBottom: 10 },
  integranteNome: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  integranteInfo: { fontSize: 12, color: colors.textSecondary },
  tech: { fontSize: 13, color: colors.textSecondary, marginBottom: 6 },
});