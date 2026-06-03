import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { useAuth } from '../src/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    setErro('');
    setCarregando(true);
    const resultado = await login(email, senha);
    setCarregando(false);
    if (resultado.sucesso) {
      router.replace('/');
    } else {
      setErro(resultado.erro);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.logo}>🛰</Text>
        <Text style={styles.titulo}>Space Sense</Text>
        <Text style={styles.subtitulo}>Monitoramento de Detritos Espaciais</Text>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={colors.textMuted}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
            />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Ionicons
                name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          {erro ? (
            <View style={styles.erroBox}>
              <Ionicons name="alert-circle-outline" size={14} color={colors.danger} />
              <Text style={styles.erroTexto}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
            {carregando
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botaoTexto}>Entrar</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.dica}>
          Demo: admin@satguard.com / 123456
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 56, textAlign: 'center', marginBottom: 12 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center' },
  subtitulo: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginBottom: 40 },
  form: { gap: 12 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  erroBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.danger + '22',
    padding: 10,
    borderRadius: 8,
  },
  erroTexto: { color: colors.danger, fontSize: 13 },
  botao: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  botaoTexto: { color: '#fff', fontWeight: '600', fontSize: 16 },
  dica: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 32 },
});