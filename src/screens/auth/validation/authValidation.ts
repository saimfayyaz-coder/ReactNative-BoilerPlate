import { z } from 'zod';
import {
  TRANSLATION_KEYS,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '@/shared/constants';

type TranslateFn = (key: string) => string;

export const createEmailSchema = (t: TranslateFn) =>
  z
    .string()
    .min(1, t(TRANSLATION_KEYS.VALIDATION_EMAIL_REQUIRED))
    .email(t(TRANSLATION_KEYS.VALIDATION_EMAIL_INVALID));

export const createPasswordSchema = (t: TranslateFn) =>
  z
    .string()
    .min(PASSWORD_MIN_LENGTH, t(TRANSLATION_KEYS.VALIDATION_PASSWORD_MIN_LENGTH))
    .max(PASSWORD_MAX_LENGTH);

export const createNameSchema = (t: TranslateFn) =>
  z
    .string()
    .min(NAME_MIN_LENGTH, t(TRANSLATION_KEYS.VALIDATION_NAME_MIN_LENGTH))
    .max(NAME_MAX_LENGTH);

export const createLoginSchema = (t: TranslateFn) =>
  z.object({
    email: createEmailSchema(t),
    password: createPasswordSchema(t),
  });

export const createSignupSchema = (t: TranslateFn) =>
  z
    .object({
      name: createNameSchema(t),
      email: createEmailSchema(t),
      password: createPasswordSchema(t),
      confirmPassword: z
        .string()
        .min(1, t(TRANSLATION_KEYS.VALIDATION_CONFIRM_PASSWORD_REQUIRED)),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t(TRANSLATION_KEYS.VALIDATION_PASSWORDS_DO_NOT_MATCH),
      path: ['confirmPassword'],
    });

export type LoginSchemaType = ReturnType<typeof createLoginSchema>;
export type SignupSchemaType = ReturnType<typeof createSignupSchema>;
export type LoginFormData = z.infer<LoginSchemaType>;
export type SignupFormData = z.infer<SignupSchemaType>;
