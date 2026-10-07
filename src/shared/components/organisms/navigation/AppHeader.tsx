import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks';
import {
  TRANSLATION_KEYS,
  ACCESSIBILITY_ROLES,
  ACCESSIBILITY_LABELS,
  APP_ICONS,
} from '@/shared/constants';
import { ms } from '@/shared/theme/scaling';
import { navigationService } from '@/navigation';
import { AppText } from '../../atoms/typography/AppText';
import { Icon } from '../../atoms/icons/Icon';

export interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onPressBack?: () => void;
  rightComponent?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton,
  onPressBack,
  rightComponent,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const canBack = navigationService.canGoBack();
  const shouldShowBack = showBackButton !== undefined ? showBackButton : Boolean(onPressBack || canBack);
  const handleBack = onPressBack ?? (() => navigationService.goBack());

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.bgPrimary,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.leftContainer}>
        {shouldShowBack && (
          <Pressable
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backButton}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel={t(TRANSLATION_KEYS.COMMON_BACK) || ACCESSIBILITY_LABELS.BACK}
          >
            <Icon
              name={APP_ICONS.CHEVRON_BACK}
              type="Ionicons"
              size={24}
              color={theme.colors.actionPrimary}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.centerContainer}>
        <AppText
          variant="h3"
          numberOfLines={1}
          align="center"
          accessibilityRole={ACCESSIBILITY_ROLES.HEADER}
        >
          {title}
        </AppText>
      </View>

      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftContainer: {
    minWidth: ms(60),
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    minWidth: ms(60),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
