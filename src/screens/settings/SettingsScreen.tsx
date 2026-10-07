import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ScreenWrapper,
  AppHeader,
  AppText,
  AppButton,
  ContentCard,
} from '@/shared/components';
import { ThemeMode } from '@/shared/theme/colors';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { commonStyles, ms } from '@/shared/theme';
import { useSettings } from './hooks/useSettings';

export const SettingsScreen: React.FC = () => {
  const {
    t,
    mode,
    setMode,
    currentLanguage,
    handleLanguageChange,
    handleLogout,
  } = useSettings();

  const themeModes: { mode: ThemeMode; key: TRANSLATION_KEYS }[] = [
    { mode: 'light', key: TRANSLATION_KEYS.SETTINGS_LIGHT },
    { mode: 'dark', key: TRANSLATION_KEYS.SETTINGS_DARK },
    { mode: 'system', key: TRANSLATION_KEYS.SETTINGS_SYSTEM },
  ];
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  return (
    <ScreenWrapper header={<AppHeader title={t(TRANSLATION_KEYS.SETTINGS_TITLE)} />}>
      <View style={styles.container}>
        {/* Theme Settings Section */}
        <ContentCard style={styles.card}>
          <AppText variant="h3" style={styles.sectionTitle}>
            {t(TRANSLATION_KEYS.SETTINGS_THEME)}
          </AppText>
          <View style={commonStyles.rowCenter}>
            {themeModes.map(item => (
              <AppButton
                key={item.mode}
                title={t(item.key)}
                variant={mode === item.mode ? 'primary' : 'secondary'}
                onPress={() => setMode(item.mode)}
                style={styles.pillButton}
              />
            ))}
          </View>
        </ContentCard>

        {/* Language Settings Section */}
        <ContentCard style={styles.card}>
          <AppText variant="h3" style={styles.sectionTitle}>
            {t(TRANSLATION_KEYS.SETTINGS_LANGUAGE)}
          </AppText>
          <View style={commonStyles.rowCenter}>
            {languages.map(lang => (
              <AppButton
                key={lang.code}
                title={lang.label}
                variant={currentLanguage === lang.code ? 'primary' : 'secondary'}
                onPress={() => handleLanguageChange(lang.code)}
                style={styles.pillButton}
              />
            ))}
          </View>
        </ContentCard>

        {/* Logout Button */}
        <AppButton
          title={t(TRANSLATION_KEYS.COMMON_LOGOUT)}
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(16),
  },
  card: {
    marginBottom: ms(16),
  },
  sectionTitle: {
    marginBottom: ms(12),
  },
  pillButton: {
    flex: 1,
    marginHorizontal: ms(4),
    height: ms(40),
  },
  logoutButton: {
    marginTop: ms(16),
  },
});
