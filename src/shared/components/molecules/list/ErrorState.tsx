import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { ms } from '@/shared/theme/scaling';
import { AppText } from '../../atoms/typography/AppText';
import { AppButton } from '../../atoms/buttons/AppButton';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryTitle?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  retryTitle = 'Try Again',
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="body" color={theme.colors.error} align="center" style={styles.message}>
        {message}
      </AppText>
      {onRetry && (
        <AppButton
          title={retryTitle}
          onPress={onRetry}
          variant="secondary"
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginBottom: ms(16),
  },
  retryButton: {
    minWidth: ms(120),
  },
});
