import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';

export default function SpaceTrack() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="globe-outline" size={18} color={colors.primary} />
        <Text style={styles.headerTexto}>space-track.org</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>DADOS REAIS</Text>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loadingTexto}>Conectando ao Space-Track...</Text>
        </View>
      )}

      {erro ? (
        <View style={styles.erroContainer}>
          <Ionicons name="wifi-outline" size={48} color={colors.textMuted} />
          <Text style={styles.erroTexto}>Não foi possível carregar o Space-Track</Text>
          <Text style={styles.erroDesc}>Verifique sua conexão com a internet</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: 'https://www.space-track.org' }}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setLoading(false); setErro(true); }}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTexto: { flex: 1, fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  badge: { backgroundColor: colors.success + '22', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  badgeTexto: { fontSize: 10, color: colors.success, fontWeight: '700', letterSpacing: 1 },
  loadingOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    zIndex: 10,
    gap: 12,
  },
  loadingTexto: { color: colors.textSecondary, fontSize: 14 },
  erroContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  erroTexto: { fontSize: 16, color: colors.textPrimary, fontWeight: '600' },
  erroDesc: { fontSize: 13, color: colors.textMuted },
  webview: { flex: 1 },
});