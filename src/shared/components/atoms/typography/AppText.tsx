import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { typography, TypographyVariant } from '@/shared/theme/typography';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const alignStyles = StyleSheet.create({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        typography[variant],
        { color: color || theme.colors.textPrimary },
        align ? alignStyles[align] : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
