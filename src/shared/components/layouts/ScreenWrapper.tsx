import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/hooks';
import { commonStyles } from '@/shared/theme';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  withSafeArea?: boolean;
  edges?: Edge[];
  withMaxWidth?: boolean;
  backgroundColor?: string;
  testID?: string;
}

/**
 * Baseline wrapper for content-display screens (Home, Feeds, Settings).
 * Uses SafeAreaView for notch/home indicator boundaries and commonStyles for layout.
 */
export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  header,
  style,
  contentStyle,
  withSafeArea = true,
  edges = ['top', 'bottom'],
  withMaxWidth = false,
  backgroundColor,
  testID,
}) => {
  const { theme } = useTheme();
  const resolvedBg = backgroundColor || theme.colors.bgPrimary;

  const content = (
    <>
      {header}
      <View
        style={[
          commonStyles.flex1,
          withMaxWidth ? commonStyles.responsiveContent : undefined,
          contentStyle,
        ]}
      >
        {children}
      </View>
    </>
  );

  if (withSafeArea) {
    return (
      <SafeAreaView
        edges={edges}
        style={[commonStyles.flex1, { backgroundColor: resolvedBg }, style]}
        testID={testID}
      >
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[commonStyles.flex1, { backgroundColor: resolvedBg }, style]}
      testID={testID}
    >
      {content}
    </View>
  );
};
