import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { commonStyles } from '@/shared/theme';

export interface AppLoaderProps {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: ViewStyle;
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  size = 'small',
  color,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[commonStyles.center, style]}>
      <ActivityIndicator size={size} color={color || theme.colors.actionPrimary} />
    </View>
  );
};
