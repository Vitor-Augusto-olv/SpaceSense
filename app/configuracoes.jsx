import { View, Text, ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { colors } from '../src/theme/colors';

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [alertaAutomatico, setAlertaAutomatico] = useState(false);
  const [limiar, setLimiar] = useState('200');

  function salvar() {
    Alert.alert('Salvo!', 'Configurações atualizadas com sucesso.');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>NOTIFICAÇÕES</Text>
        <View style={styles.linha}>
          <Text style={styles.label}>Receber alertas</Text>
          <Switch value={notificacoes} onValueChange={setNotificacoes} trackColor={{ true: colors.primary }} thumbColor="#fff" />
        </View>
        <View style={styles.linha}>
          <Text style={styles.label}>Alerta automático</Text>
          <Switch value={alertaAutomatico} onValueChange={setAlertaAutomatico} trackColor={{ true: colors.primary }} thumbColor="#fff" />
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>LIMIAR DE RISCO</Text>
        <Text style={styles.descricao}>Distância mínima (km) para acionar alerta de risco alto</Text>
        <TextInput
          style={styles.input}
          value={limiar}
          onChangeText={setLimiar}
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Configurações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20, marginTop: 8 },
  secao: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 14, color: colors.textPrimary },
  descricao: { fontSize: 12, color: colors.textSecondary, marginBottom: 10 },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10, color: colors.textPrimary },
  botao: { backgroundColor: colors.primary, borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
});