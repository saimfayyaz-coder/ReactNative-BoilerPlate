import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/hooks';
import { commonStyles } from '@/shared/theme';
import { isIOS } from '@/shared/constants';

export interface KeyboardScreenWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  withSafeArea?: boolean;
  edges?: Edge[];
  bottomOffset?: number;
  dismissKeyboardOnTap?: boolean;
  withMaxWidth?: boolean;
  backgroundColor?: string;
  testID?: string;
}

export const KeyboardScreenWrapper: React.FC<KeyboardScreenWrapperProps> = ({
  children,
  header,
  style,
  contentContainerStyle,
  withSafeArea = true,
  edges = ['top', 'bottom'],
  bottomOffset = 24,
  dismissKeyboardOnTap = true,
  withMaxWidth = true,
  backgroundColor,
  testID,
}) => {
  const { theme } = useTheme();
  const resolvedBg = backgroundColor || theme.colors.bgPrimary;

  const innerContent = (
    <View
      style={[
        commonStyles.flexGrow1,
        withMaxWidth ? commonStyles.responsiveContent : commonStyles.fullWidth,
      ]}
    >
      {children}
    </View>
  );

  const body = (
    <>
      {header}

      <KeyboardAwareScrollView
        style={commonStyles.flex1}
        contentContainerStyle={[commonStyles.flexGrow1, contentContainerStyle]}
        bottomOffset={bottomOffset}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={isIOS ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={false}
      >
        {dismissKeyboardOnTap ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {innerContent}
          </TouchableWithoutFeedback>
        ) : (
          innerContent
        )}
      </KeyboardAwareScrollView>
    </>
  );

  if (withSafeArea) {
    return (
      <SafeAreaView
        edges={edges}
        style={[commonStyles.flex1, { backgroundColor: resolvedBg }, style]}
        testID={testID}
      >
        {body}
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[commonStyles.flex1, { backgroundColor: resolvedBg }, style]}
      testID={testID}
    >
      {body}
    </View>
  );
};
