// components/AppLogo.tsx
// Logo do app com largura fixa e proporção original da imagem

import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  width?: number;
  aspectRatio: number;
};

export function AppLogo({ source, width = 250, aspectRatio }: Props) {
  return (
    <Image
      source={source}
      style={[styles.logo, { width, aspectRatio }]}
      contentFit="contain"
      accessibilityLabel="Logo Ignis Orbital"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
