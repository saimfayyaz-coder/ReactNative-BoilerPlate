import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import {
  KeyboardScreenWrapper,
  OtpVerificationWidget,
  AppHeader,
} from '@/shared/components';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { useToast } from '@/shared/hooks';
import { executeFormMutation } from '@/shared/lib/forms';
import { useVerifyOtpMutation, useResendOtpMutation } from '@/store';
import { ms } from '@/shared/theme';

export interface OtpRouteParams {
  destination: string;
  purpose?: string;
}

export const OtpScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const toast = useToast();
  const params = (route.params as OtpRouteParams) || { destination: 'your email' };

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleVerify = async (code: string) => {
    setErrorMessage(undefined);
    await executeFormMutation({
      action: () =>
        verifyOtp({
          code,
          destination: params.destination,
        }).unwrap(),
      onError: parsed => {
        setErrorMessage(parsed.message || t(TRANSLATION_KEYS.AUTH_INVALID_CODE));
      },
    });
  };

  const handleResend = async () => {
    setErrorMessage(undefined);
    await executeFormMutation({
      action: () => resendOtp({ destination: params.destination }).unwrap(),
      onSuccess: () => {
        toast.success(t(TRANSLATION_KEYS.AUTH_OTP_TITLE));
      },
      showToast: toast.error,
    });
  };

  return (
    <KeyboardScreenWrapper
      header={<AppHeader title={t(TRANSLATION_KEYS.AUTH_VERIFICATION)} />}
      contentContainerStyle={styles.container}
    >
      <OtpVerificationWidget
        destination={params.destination}
        onVerify={handleVerify}
        onResend={handleResend}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </KeyboardScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingVertical: ms(20),
  },
});
