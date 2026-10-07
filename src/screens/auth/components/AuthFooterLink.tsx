import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AppText } from '@/shared/components';
import { useTheme } from '@/shared/hooks';
import { commonStyles, ms } from '@/shared/theme';

export interface AuthFooterLinkProps {
  promptText: string;
  actionText: string;
  onPress: () => void;
}

export const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  promptText,
  actionText,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[commonStyles.rowCenter, commonStyles.justifyCenter, styles.container]}>
      <AppText variant="body" color={theme.colors.textSecondary}>
        {promptText}{' '}
      </AppText>
      <Pressable
        onPress={onPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
      >
        <AppText variant="button" color={theme.colors.actionPrimary}>
          {actionText}
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: ms(24),
    marginBottom: ms(16),
  },
});
