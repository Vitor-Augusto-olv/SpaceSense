import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function StatusCard({ titulo, valor, nivel }) {
  const nivelColor = {
    DANGER: colors.danger,
    WARNING: colors.warning,
    SAFE: colors.success,
    INFO: colors.primary,
  }[nivel] || colors.textSecondary;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={[styles.valor, { color: nivelColor }]}>{valor}</Text>
      {nivel && (
        <View style={[styles.badge, { backgroundColor: nivelColor + '22' }]}>
          <Text style={[styles.badgeText, { color: nivelColor }]}>{nivel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});