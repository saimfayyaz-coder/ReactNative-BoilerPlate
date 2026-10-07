import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { ms } from '@/shared/theme/scaling';

export interface ContentCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: ms(16),
    borderRadius: ms(12),
    borderWidth: 1,
  },
});
