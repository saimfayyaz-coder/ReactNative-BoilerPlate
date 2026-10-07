import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { ms } from '@/shared/theme/scaling';
import { AppText } from '../../atoms/typography/AppText';

export interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="body" color={theme.colors.textSecondary} align="center">
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
