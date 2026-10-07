import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { useTheme } from '@/shared/hooks';
import { commonStyles, ms } from '@/shared/theme';
import { AppText } from '../../atoms/typography/AppText';
import { AppButton } from '../../atoms/buttons/AppButton';
import { OtpCodeInput } from '../../atoms/inputs/OtpCodeInput';
import { useOtpTimer } from './useOtpTimer';

export interface OtpVerificationWidgetProps {
  destination?: string;
  length?: number;
  onVerify: (code: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Reusable OTP Verification feature widget.
 * Usable inside screens, modals, or bottom sheets.
 */
export const OtpVerificationWidget: React.FC<OtpVerificationWidgetProps> = ({
  destination,
  length = 6,
  onVerify,
  onResend,
  isLoading = false,
  errorMessage,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const { isTimerActive, formattedTime, restartTimer } = useOtpTimer(30);

  const handleResend = () => {
    if (!isTimerActive) {
      restartTimer();
      onResend?.();
    }
  };

  const handleVerify = () => {
    if (code.length === length) {
      onVerify(code);
    }
  };

  return (
    <View style={styles.container}>
      <View style={commonStyles.center}>
        <AppText variant="h1" style={styles.title}>
          {title || t(TRANSLATION_KEYS.AUTH_OTP_TITLE)}
        </AppText>
        <AppText
          variant="body"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          {subtitle || t(TRANSLATION_KEYS.AUTH_OTP_SUBTITLE)}
          {destination ? `\n${destination}` : ''}
        </AppText>
      </View>

      <OtpCodeInput
        code={code}
        length={length}
        onChangeCode={setCode}
        hasError={Boolean(errorMessage)}
      />

      {errorMessage && (
        <AppText
          variant="caption"
          color={theme.colors.error}
          align="center"
          style={styles.error}
        >
          {errorMessage}
        </AppText>
      )}

      {/* Resend Timer Row */}
      <View style={[commonStyles.rowCenter, commonStyles.justifyCenter, styles.resendRow]}>
        {isTimerActive ? (
          <AppText variant="caption" color={theme.colors.textSecondary}>
            {t(TRANSLATION_KEYS.AUTH_RESEND_IN)} {formattedTime}
          </AppText>
        ) : (
          <Pressable
            onPress={handleResend}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
          >
            <AppText variant="caption" color={theme.colors.actionPrimary}>
              {t(TRANSLATION_KEYS.AUTH_RESEND)}
            </AppText>
          </Pressable>
        )}
      </View>

      <AppButton
        title={t(TRANSLATION_KEYS.AUTH_VERIFY)}
        onPress={handleVerify}
        isLoading={isLoading}
        disabled={code.length < length}
        style={styles.verifyButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: ms(20),
  },
  title: {
    marginBottom: ms(8),
  },
  subtitle: {
    marginBottom: ms(16),
  },
  error: {
    marginBottom: ms(12),
  },
  resendRow: {
    marginBottom: ms(24),
  },
  verifyButton: {
    width: '100%',
  },
});
