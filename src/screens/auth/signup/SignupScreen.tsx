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
import { useSignup } from './hooks/useSignup';

export const SignupScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting,
    handleSignup,
  } = useSignup();

  return (
    <KeyboardScreenWrapper contentContainerStyle={styles.container}>
      <AuthHeader
        title={t(TRANSLATION_KEYS.AUTH_SIGNUP)}
        subtitle={t(TRANSLATION_KEYS.AUTH_SIGNUP_SUBTITLE)}
      />

      <View style={styles.form}>
        <AppInput
          label={t(TRANSLATION_KEYS.AUTH_NAME)}
          placeholder={t(TRANSLATION_KEYS.AUTH_NAME_PLACEHOLDER)}
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          errorMessage={errors.name}
        />

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

        <AppInput
          label={t(TRANSLATION_KEYS.AUTH_CONFIRM_PASSWORD)}
          placeholder={t(TRANSLATION_KEYS.AUTH_CONFIRM_PASSWORD_PLACEHOLDER)}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
          errorMessage={errors.confirmPassword}
        />

        <AppButton
          title={t(TRANSLATION_KEYS.AUTH_SIGNUP)}
          onPress={handleSignup}
          isLoading={isSubmitting}
          style={styles.signupButton}
        />
      </View>

      <AuthFooterLink
        promptText={t(TRANSLATION_KEYS.AUTH_ALREADY_HAVE_ACCOUNT)}
        actionText={t(TRANSLATION_KEYS.AUTH_LOGIN)}
        onPress={() => navigationService.navigate(AUTH_ROUTES.LOGIN)}
      />
    </KeyboardScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    justifyContent: 'center',
    flexGrow: 1,
    paddingVertical: ms(20),
  },
  form: {
    width: '100%',
  },
  signupButton: {
    marginTop: ms(8),
  },
});
