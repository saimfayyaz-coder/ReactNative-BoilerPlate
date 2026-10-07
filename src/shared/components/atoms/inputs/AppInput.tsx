import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks';
import {
  TRANSLATION_KEYS,
  ACCESSIBILITY_ROLES,
  ACCESSIBILITY_LABELS,
  APP_ICONS,
} from '@/shared/constants';
import { ms } from '@/shared/theme/scaling';
import { AppText } from '../typography/AppText';
import { Icon } from '../icons/Icon';

export interface AppInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  isPassword?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  errorMessage,
  isPassword = false,
  style,
  ...rest
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(errorMessage);

  const getBorderColor = () => {
    if (hasError) return theme.colors.error;
    if (isFocused) return theme.colors.actionPrimary;
    return theme.colors.border;
  };

  return (
    <View style={styles.container}>
      {label && (
        <AppText
          variant="caption"
          color={theme.colors.textSecondary}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.surface,
            borderColor: getBorderColor(),
          },
        ]}
      >
        <TextInput
          placeholderTextColor={theme.colors.textTertiary}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={rest.accessibilityLabel || label || rest.placeholder}
          style={[
            styles.input,
            { color: theme.colors.textPrimary },
            style,
          ]}
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel={ACCESSIBILITY_LABELS.TOGGLE_PASSWORD}
          >
            <Icon
              name={showPassword ? APP_ICONS.EYE_OFF : APP_ICONS.EYE}
              type="Ionicons"
              size={20}
              color={theme.colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {hasError && (
        <AppText
          variant="caption"
          color={theme.colors.error}
          style={styles.error}
        >
          {errorMessage}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: ms(16),
  },
  label: {
    marginBottom: ms(6),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(48),
    borderWidth: 1,
    borderRadius: ms(8),
    paddingHorizontal: ms(12),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: ms(15),
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: ms(8),
  },
  error: {
    marginTop: ms(4),
  },
});
