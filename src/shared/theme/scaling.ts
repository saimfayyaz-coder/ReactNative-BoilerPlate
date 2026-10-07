import {
  scale as rnScale,
  verticalScale as rnVerticalScale,
  moderateScale as rnModerateScale,
  moderateVerticalScale as rnModerateVerticalScale,
} from 'react-native-size-matters';

export const DEFAULT_SCALE_FACTOR = 0.3;

export const scale = (size: number): number => rnScale(size);

export const verticalScale = (size: number): number => rnVerticalScale(size);

export const moderateScale = (
  size: number,
  factor: number = DEFAULT_SCALE_FACTOR,
): number => rnModerateScale(size, factor);

export const moderateVerticalScale = (
  size: number,
  factor: number = DEFAULT_SCALE_FACTOR,
): number => rnModerateVerticalScale(size, factor);

export const ms = moderateScale;
export const s = scale;
export const vs = verticalScale;
export const mvs = moderateVerticalScale;

