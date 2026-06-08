import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import { colors, fonts } from '../constants/theme';
import BottomNavigation from '../components/BottomNavigation';

SplashScreen.preventAutoHideAsync();

const MAIN_ROUTES = ['/sobre', '/index', '/login', '/dashboard'];

function shouldShowBottomNav(pathname: string): boolean {
  if (pathname.includes('/alerta/') || pathname.includes('/form')) return false;
  return (
    pathname === '/' ||
    MAIN_ROUTES.some((route) => pathname === route || pathname.endsWith(route))
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
    [fonts.regular]: Poppins_400Regular,
    [fonts.semiBold]: Poppins_600SemiBold,
    [fonts.bold]: Poppins_700Bold,
  });

  const pathname = usePathname();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const showBottomNav = shouldShowBottomNav(pathname);

  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bgCard },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: { fontFamily: fonts.bold },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="(public)/index" options={{ title: 'Alertas Ativos' }} />
          <Stack.Screen name="(public)/sobre" options={{ title: 'Ignis Orbital', headerShown: false }} />
          <Stack.Screen name="(public)/login" options={{ title: 'Login' }} />
          <Stack.Screen name="(public)/alerta/[id]" options={{ title: 'Detalhes do Alerta' }} />
          <Stack.Screen name="(admin)/dashboard" options={{ title: 'Painel Admin', headerBackVisible: false }} />
          <Stack.Screen name="(admin)/form" options={{ title: 'Região' }} />
        </Stack>
        {showBottomNav && <BottomNavigation />}
      </View>
    </AuthProvider>
  );
}
