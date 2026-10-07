import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
  StyleProp,
} from 'react-native';
import { useTheme } from '@/shared/hooks';
import { ACCESSIBILITY_ROLES } from '@/shared/constants';
import { ms } from '@/shared/theme/scaling';
import { AppText } from '../typography/AppText';
import { AppLoader } from '../feedback/AppLoader';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface AppButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}


export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  ...rest
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.actionPrimary;
      case 'secondary':
        return theme.colors.actionSecondary;
      case 'danger':
        return theme.colors.error;
      case 'ghost':
        return 'transparent';
      default:
        return theme.colors.actionPrimary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return theme.colors.white;
      case 'secondary':
        return theme.colors.textPrimary;
      case 'ghost':
        return theme.colors.actionPrimary;
      default:
        return theme.colors.white;
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: isDisabled ? 0.6 : pressed ? 0.75 : 1,
        },
        style,
      ]}
      accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
      accessibilityLabel={rest.accessibilityLabel || title}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      {...rest}
    >
      {isLoading ? (
        <AppLoader size="small" color={getTextColor()} />
      ) : (
        <AppText
          variant="button"
          color={getTextColor()}
          style={[styles.text, textStyle]}
        >
          {title}
        </AppText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: ms(48),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(16),
  },
  text: {
    textAlign: 'center',
  },
});
