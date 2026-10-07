import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AUTH_ROUTES } from '@/shared/constants';
import { navigationService } from '@/navigation';
import { useSignupMutation } from '@/store';
import { createSignupSchema } from '../../validation';

export const useSignup = () => {
  const { t } = useTranslation();
  const [signupMutation, { isLoading }] = useSignupMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleSignup = async () => {
    setErrors({});
    const schema = createSignupSchema(t);
    const result = schema.safeParse({ name, email, password, confirmPassword });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach(err => {
        const path = err.path[0]?.toString();
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await signupMutation({
        name,
        email,
        password,
      }).unwrap();

      navigationService.navigate(AUTH_ROUTES.OTP, {
        destination: result.data.email,
        purpose: 'SIGNUP',
      });
    } catch (error: any) {
      setErrors({
        general: error?.data?.message || 'Registration failed. Please try again.',
      });
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting: isLoading,
    handleSignup,
  };
};
