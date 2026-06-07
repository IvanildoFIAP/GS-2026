// app/_layout.tsx
// Layout raiz — configura o AuthProvider e a navegação Stack principal

import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bgCard },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        {/* Telas Públicas */}
        <Stack.Screen name="(public)/index"    options={{ title: 'Ignis Orbital',   headerShown: false }} />
        <Stack.Screen name="(public)/login"    options={{ title: 'Login' }} />
        <Stack.Screen name="(public)/home"     options={{ title: '🔥 Alertas Ativos' }} />
        <Stack.Screen name="(public)/alerta/[id]" options={{ title: 'Detalhes do Alerta' }} />

        {/* Telas Privadas */}
        <Stack.Screen name="(admin)/dashboard" options={{ title: '⚙️ Painel Admin', headerBackVisible: false }} />
        <Stack.Screen name="(admin)/form"      options={{ title: 'Região' }} />
      </Stack>
    </AuthProvider>
  );
}
