import { View, Text, ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [alertaAutomatico, setAlertaAutomatico] = useState(false);
  const [soundAlert, setSoundAlert] = useState(true);
  const [limiar, setLimiar] = useState('200');
  const [intervalo, setIntervalo] = useState('30');
  const [urlApi, setUrlApi] = useState('http://localhost:8080/api');
  const { logout } = useAuth();
  const router = useRouter();

  function salvar() {
    Alert.alert('✓ Salvo', 'Configurações atualizadas com sucesso.');
  }

  function resetar() {
    Alert.alert('Resetar', 'Deseja restaurar as configurações padrão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Resetar', style: 'destructive', onPress: () => {
          setNotificacoes(true);
          setAlertaAutomatico(false);
          setSoundAlert(true);
          setLimiar('200');
          setIntervalo('30');
          setUrlApi('http://localhost:8080/api');
          Alert.alert('✓ Resetado', 'Configurações padrão restauradas.');
        }
      }
    ]);
  }

  function handleLogout() {
  Alert.alert('Sair', 'Deseja encerrar a sessão?', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Sair', style: 'destructive', onPress: async () => {
        await logout();
      }
    }
  ]);
}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Configurações</Text>

      {/* Notificações */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="notifications-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>NOTIFICAÇÕES</Text>
        </View>

        <View style={styles.linha}>
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>Receber alertas</Text>
            <Text style={styles.labelDesc}>Notificações de novos alertas</Text>
          </View>
          <Switch value={notificacoes} onValueChange={setNotificacoes} trackColor={{ true: colors.primary }} thumbColor="#fff" />
        </View>

        <View style={styles.separador} />

        <View style={styles.linha}>
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>Alerta automático</Text>
            <Text style={styles.labelDesc}>Detectar riscos automaticamente</Text>
          </View>
          <Switch value={alertaAutomatico} onValueChange={setAlertaAutomatico} trackColor={{ true: colors.primary }} thumbColor="#fff" />
        </View>

        <View style={styles.separador} />

        <View style={styles.linha}>
          <View style={styles.linhaInfo}>
            <Text style={styles.label}>Som de alerta</Text>
            <Text style={styles.labelDesc}>Tocar som ao receber alertas</Text>
          </View>
          <Switch value={soundAlert} onValueChange={setSoundAlert} trackColor={{ true: colors.primary }} thumbColor="#fff" />
        </View>
      </View>

      {/* Monitoramento */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="radar-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>MONITORAMENTO</Text>
        </View>

        <Text style={styles.inputLabel}>Distância mínima de risco (km)</Text>
        <TextInput
          style={styles.input}
          value={limiar}
          onChangeText={setLimiar}
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.inputLabel}>Intervalo de atualização (segundos)</Text>
        <TextInput
          style={styles.input}
          value={intervalo}
          onChangeText={setIntervalo}
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      {/* API */}
      <View style={styles.secao}>
        <View style={styles.secaoHeaderRow}>
          <Ionicons name="cloud-outline" size={16} color={colors.primary} />
          <Text style={styles.secaoTitulo}>CONEXÃO COM API</Text>
        </View>

        <Text style={styles.inputLabel}>URL da API</Text>
        <TextInput
          style={styles.input}
          value={urlApi}
          onChangeText={setUrlApi}
          autoCapitalize="none"
          placeholderTextColor={colors.textMuted}
        />

        <View style={styles.statusApi}>
          <View style={styles.statusDot} />
          <Text style={styles.statusTexto}>API não conectada — usando dados locais</Text>
        </View>
      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.botaoPrimario} onPress={salvar}>
        <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
        <Text style={styles.botaoTexto}>Salvar Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={resetar}>
        <Ionicons name="refresh-outline" size={18} color={colors.textSecondary} />
        <Text style={styles.botaoSecundarioTexto}>Restaurar Padrões</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoLogout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.botaoLogoutTexto}>Encerrar Sessão</Text>
      </TouchableOpacity>

      <Text style={styles.versao}>Space Sense v1.0.0 — FIAP Global Solution 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20, marginTop: 8 },
  secao: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  secaoHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linhaInfo: { flex: 1, marginRight: 12 },
  label: { fontSize: 14, color: colors.textPrimary },
  labelDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  separador: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  inputLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 6, marginTop: 4 },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.textPrimary, marginBottom: 12 },
  statusApi: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.warning },
  statusTexto: { fontSize: 12, color: colors.warning },
  botaoPrimario: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: 10, padding: 14, marginBottom: 10 },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
  botaoSecundario: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.card, borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  botaoSecundarioTexto: { color: colors.textSecondary, fontWeight: '600', fontSize: 15 },
  botaoLogout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.danger + '22', borderRadius: 10, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: colors.danger + '44' },
  botaoLogoutTexto: { color: colors.danger, fontWeight: '600', fontSize: 15 },
  versao: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginBottom: 32 },
});