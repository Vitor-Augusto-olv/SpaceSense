import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { useAuth } from '../src/context/AuthContext';

export default function Perfil() {
  const { usuario, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
  Alert.alert('Sair', 'Deseja encerrar a sessão?', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Sair', style: 'destructive', onPress: async () => {
        await logout();
      }
    }
  ]);
}

  const stats = [
    { icone: 'planet-outline', label: 'Detritos monitorados', valor: '3', cor: colors.primary },
    { icone: 'warning-outline', label: 'Alertas ativos', valor: '3', cor: colors.warning },
    { icone: 'shield-checkmark-outline', label: 'Status do sistema', valor: 'ON', cor: colors.success },
    { icone: 'time-outline', label: 'Última atualização', valor: 'Agora', cor: colors.textSecondary },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetra}>
            {usuario?.nome?.charAt(0) || 'O'}
          </Text>
        </View>
        <Text style={styles.nome}>{usuario?.nome || 'Operador'}</Text>
        <Text style={styles.email}>{usuario?.email || ''}</Text>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={12} color={colors.success} />
          <Text style={styles.badgeTexto}>Operador Autorizado</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.grid}>
        {stats.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Ionicons name={s.icone} size={20} color={s.cor} />
            <Text style={[styles.statValor, { color: s.cor }]}>{s.valor}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>CONTA</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.menuTexto}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.menuTexto}>Notificações</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.menuTexto}>Segurança</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>SISTEMA</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/sobre')}>
          <Ionicons name="information-circle-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.menuTexto}>Sobre o App</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.menuTexto}>Documentação da API</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutTexto}>Encerrar Sessão</Text>
      </TouchableOpacity>

      <Text style={styles.versao}>Space Sense v1.0.0 — FIAP Global Solution 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  avatarSection: { alignItems: 'center', marginTop: 16, marginBottom: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '33',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLetra: { fontSize: 32, fontWeight: 'bold', color: colors.primary },
  nome: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  email: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.success + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    marginTop: 8,
  },
  badgeTexto: { fontSize: 11, color: colors.success, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard: {
    width: '47.5%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
    gap: 4,
  },
  statValor: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
  statLabel: { fontSize: 11, color: colors.textMuted },
  secao: { marginBottom: 20 },
  secaoTitulo: { fontSize: 11, color: colors.textMuted, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuTexto: { fontSize: 14, color: colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.danger + '22',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.danger + '44',
    marginBottom: 16,
  },
  logoutTexto: { fontSize: 14, fontWeight: '600', color: colors.danger },
  versao: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginBottom: 32 },
});