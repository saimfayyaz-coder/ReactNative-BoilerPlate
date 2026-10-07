import { ms } from './scaling';

export const typography = {
  h1: {
    fontSize: ms(24),
    lineHeight: ms(30),
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: ms(20),
    lineHeight: ms(26),
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: ms(17),
    lineHeight: ms(22),
    fontWeight: '600' as const,
  },
  body: {
    fontSize: ms(15),
    lineHeight: ms(20),
    fontWeight: '400' as const,
  },
  bodySemibold: {
    fontSize: ms(15),
    lineHeight: ms(20),
    fontWeight: '600' as const,
  },
  caption: {
    fontSize: ms(12),
    lineHeight: ms(16),
    fontWeight: '400' as const,
  },
  button: {
    fontSize: ms(15),
    lineHeight: ms(20),
    fontWeight: '600' as const,
  },
};

export type TypographyVariant = keyof typeof typography;
