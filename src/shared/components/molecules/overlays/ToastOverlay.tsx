import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideToast, TOAST_TYPE, TOAST_POSITION } from '@/store';
import { useTheme } from '@/shared/hooks';
import { ms } from '@/shared/theme/scaling';

export const ToastOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { visible, message, type, duration, position } = useAppSelector(
    state => state.toast,
  );

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible && message) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          dispatch(hideToast());
        });
      }, duration || 3000);
    } else {
      opacity.setValue(0);
      translateY.setValue(20);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, message, duration, opacity, translateY, dispatch]);

  if (!visible && !message) {
    return null;
  }

  const isMiddle = position === TOAST_POSITION.MIDDLE;

  const getBackgroundColor = () => {
    if (type === TOAST_TYPE.ERROR) return theme.colors.error;
    if (type === TOAST_TYPE.SUCCESS) return theme.colors.success;
    return theme.colors.toastBg;
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
        isMiddle
          ? styles.middleContainer
          : { bottom: Math.max(insets.bottom + ms(16), ms(24)) },
      ]}
    >
      <Animated.View
        style={[
          styles.pill,
          {
            backgroundColor: getBackgroundColor(),
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme.colors.toastText,
            },
          ]}
          numberOfLines={3}
        >
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  middleContainer: {
    top: '45%',
  },
  pill: {
    maxWidth: '90%',
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    borderRadius: ms(24),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  text: {
    fontSize: ms(14),
    lineHeight: ms(18),
    textAlign: 'center',
    fontWeight: '600',
  },
});
