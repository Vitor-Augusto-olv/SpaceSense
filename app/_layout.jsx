import { Tabs, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

function RootLayout() {
  const { usuario, carregando } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (carregando) return;
    const naTelaDeLogin = segments[0] === 'login';
    if (!usuario && !naTelaDeLogin) {
      router.replace('/login');
    } else if (usuario && naTelaDeLogin) {
      router.replace('/');
    }
  }, [usuario, carregando, segments]);

  if (carregando) return null;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 6,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="planet-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="alertas"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color, size }) => <Ionicons name="warning-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="detritos"
        options={{
          title: 'Detritos',
          tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="spacetrack"
        options={{
          title: 'Space-Track',
          tabBarIcon: ({ color, size }) => <Ionicons name="globe-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen name="configuracoes" options={{ href: null,  headerShown: false }} />
      <Tabs.Screen name="sobre" options={{ href: null }} />
      <Tabs.Screen name="login" options={{ href: null,  headerShown: false }} />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}