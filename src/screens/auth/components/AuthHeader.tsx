import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/shared/components';
import { useTheme } from '@/shared/hooks';
import { commonStyles, ms } from '@/shared/theme';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View style={[commonStyles.center, styles.container]}>
      <AppText variant="h1" align="center" style={styles.title}>
        {title}
      </AppText>
      {subtitle && (
        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          {subtitle}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: ms(24),
  },
  title: {
    marginBottom: ms(8),
  },
  subtitle: {
    paddingHorizontal: ms(16),
  },
});
