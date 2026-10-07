import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper, AppHeader, AppInput, AppButton } from '@/shared/components';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { ms } from '@/shared/theme';
import { useEditProfile } from './hooks/useEditProfile';

export const EditProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { name, setName, bio, setBio } = useEditProfile();

  const handleSave = () => {
    // Save logic can be wired here
  };

  return (
    <ScreenWrapper header={<AppHeader title={t(TRANSLATION_KEYS.PROFILE_EDIT_TITLE)} />}>
      <View style={styles.container}>
        <AppInput
          label={t(TRANSLATION_KEYS.PROFILE_NAME)}
          value={name}
          onChangeText={setName}
          placeholder={t(TRANSLATION_KEYS.PROFILE_NAME_PLACEHOLDER)}
          autoCapitalize="words"
        />
        <AppInput
          label={t(TRANSLATION_KEYS.PROFILE_BIO)}
          value={bio}
          onChangeText={setBio}
          placeholder={t(TRANSLATION_KEYS.PROFILE_BIO_PLACEHOLDER)}
          multiline
        />
        <AppButton
          title={t(TRANSLATION_KEYS.PROFILE_SAVE)}
          onPress={handleSave}
          style={styles.saveButton}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
  },
  saveButton: {
    marginTop: ms(16),
  },
});
