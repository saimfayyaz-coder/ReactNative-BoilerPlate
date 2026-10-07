import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  KeyboardScreenWrapper,
  AppInput,
  AppButton,
} from '@/shared/components';
import { TRANSLATION_KEYS, AUTH_ROUTES } from '@/shared/constants';
import { ms } from '@/shared/theme';
import { navigationService } from '@/navigation';
import { AuthHeader, AuthFooterLink } from '../components';
import { useLogin } from './hooks/useLogin';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting,
    handleLogin,
  } = useLogin();

  return (
    <KeyboardScreenWrapper contentContainerStyle={styles.container}>
      <AuthHeader
        title={t(TRANSLATION_KEYS.COMMON_WELCOME)}
        subtitle={t(TRANSLATION_KEYS.AUTH_LOGIN_SUBTITLE)}
      />

      <View style={styles.form}>
        <AppInput
          label={t(TRANSLATION_KEYS.AUTH_EMAIL)}
          placeholder={t(TRANSLATION_KEYS.AUTH_EMAIL_PLACEHOLDER)}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={errors.email}
        />

        <AppInput
          label={t(TRANSLATION_KEYS.AUTH_PASSWORD)}
          placeholder={t(TRANSLATION_KEYS.AUTH_PASSWORD_PLACEHOLDER)}
          value={password}
          onChangeText={setPassword}
          isPassword
          errorMessage={errors.password}
        />

        <AppButton
          title={t(TRANSLATION_KEYS.AUTH_LOGIN)}
          onPress={handleLogin}
          isLoading={isSubmitting}
          style={styles.loginButton}
        />
      </View>

      <AuthFooterLink
        promptText={t(TRANSLATION_KEYS.AUTH_DONT_HAVE_ACCOUNT)}
        actionText={t(TRANSLATION_KEYS.AUTH_SIGNUP)}
        onPress={() => navigationService.navigate(AUTH_ROUTES.SIGNUP)}
      />
    </KeyboardScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    justifyContent: 'center',
    flexGrow: 1,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: ms(8),
  },
});
