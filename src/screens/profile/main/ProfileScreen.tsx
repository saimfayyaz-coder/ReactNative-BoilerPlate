import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper, AppHeader, AppText } from '@/shared/components';
import { useTheme } from '@/shared/hooks';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { ms } from '@/shared/theme';
import { useProfile } from './hooks/useProfile';

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { profile } = useProfile();

  return (
    <ScreenWrapper header={<AppHeader title={t(TRANSLATION_KEYS.PROFILE_TITLE)} />}>
      <View style={styles.container}>
        <AppText variant="h2">
          {profile?.name || t(TRANSLATION_KEYS.PROFILE_DEFAULT_USER)}
        </AppText>
        <AppText variant="body" color={theme.colors.textSecondary}>
          {profile?.email || ''}
        </AppText>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
  },
});
