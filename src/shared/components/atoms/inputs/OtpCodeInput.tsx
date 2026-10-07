import React, { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useTheme } from '@/shared/hooks';
import { ms } from '@/shared/theme/scaling';
import { AppText } from '../typography/AppText';

export interface OtpCodeInputProps {
  code: string;
  length?: number;
  onChangeCode: (code: string) => void;
  hasError?: boolean;
}

/**
 * Split-box digit input for OTP verification codes.
 */
export const OtpCodeInput: React.FC<OtpCodeInputProps> = ({
  code,
  length = 6,
  onChangeCode,
  hasError = false,
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const digits = Array.from({ length }, (_, i) => code[i] || '');

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={styles.container}
    >
      <View style={styles.boxesContainer}>
        {digits.map((digit, index) => {
          const isCurrent = index === code.length && code.length < length;
          const isFilled = Boolean(digit);

          const borderColor = hasError
            ? theme.colors.error
            : isCurrent
            ? theme.colors.actionPrimary
            : isFilled
            ? theme.colors.textSecondary
            : theme.colors.border;

          return (
            <View
              key={index}
              style={[
                styles.box,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor,
                },
              ]}
            >
              <AppText variant="h2" align="center" style={styles.digitText}>
                {digit}
              </AppText>
            </View>
          );
        })}
      </View>

      {/* Hidden native input capture */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={text => {
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
          onChangeCode(cleaned);
        }}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        style={styles.hiddenInput}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: ms(20),
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: ms(10),
  },
  box: {
    width: ms(44),
    height: ms(52),
    borderWidth: 1.5,
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitText: {
    includeFontPadding: false,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
