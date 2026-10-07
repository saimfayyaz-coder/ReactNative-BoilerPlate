import { ms } from './scaling';

export const spacing = {
  none: 0,
  xxs: ms(2),
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  xxl: ms(24),
  xxxl: ms(32),
};

export type SpacingKey = keyof typeof spacing;
