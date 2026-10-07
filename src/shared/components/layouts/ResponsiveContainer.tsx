import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { commonStyles } from '@/shared/theme';

export interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Responsive layout container that constrains content to a maximum width (440)
 * on tablets, foldables, and landscape screens, keeping layouts centered.
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  contentStyle,
}) => {
  return (
    <View style={[commonStyles.fullWidth, commonStyles.center, style]}>
      <View style={[commonStyles.responsiveContent, contentStyle]}>
        {children}
      </View>
    </View>
  );
};
