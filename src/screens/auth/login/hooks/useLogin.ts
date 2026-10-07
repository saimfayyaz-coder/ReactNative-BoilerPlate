import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '@/store';
import { useToast } from '@/shared/hooks';
import { executeFormMutation } from '@/shared/lib/forms';
import { createLoginSchema } from '../../validation';

export const useLogin = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleLogin = async () => {
    setErrors({});
    const schema = createLoginSchema(t);
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach(err => {
        const path = err.path[0]?.toString();
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    await executeFormMutation({
      action: () => loginMutation({ email, password }).unwrap(),
      setErrors,
      showToast: toast.error,
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting: isLoading,
    handleLogin,
  };
};
