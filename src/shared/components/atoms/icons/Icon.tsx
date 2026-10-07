import React from 'react';
import { StyleProp, TextStyle, AccessibilityRole } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useTheme } from '@/shared/hooks';
import { scale } from '@/shared/theme/scaling';
import { ACCESSIBILITY_ROLES } from '@/shared/constants';

export type IconType =
  | 'Ionicons'
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'Entypo'
  | 'AntDesign'
  | 'Feather'
  | 'EvilIcons'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Octicons'
  | 'Zocial'
  | 'Foundation'
  | 'FontAwesome5'
  | 'Fontisto';

export interface IconProps {
  name: string;
  type: IconType;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const iconMap = {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
  AntDesign,
  Feather,
  EvilIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Octicons,
  Zocial,
  Foundation,
  FontAwesome5,
  Fontisto,
};

export const Icon: React.FC<IconProps> = ({
  name,
  type,
  size = 16,
  color,
  style,
  onPress,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { theme } = useTheme();
  const VectorIcon = iconMap[type];

  if (!VectorIcon) return null;

  const resolvedColor = color ?? theme?.colors?.textPrimary ?? '#000000';
  const role =
    accessibilityRole ?? (onPress ? ACCESSIBILITY_ROLES.BUTTON : ACCESSIBILITY_ROLES.IMAGE);

  return (
    <VectorIcon
      name={name}
      size={scale(size)}
      color={resolvedColor}
      style={style}
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    />
  );
};

export default Icon;
