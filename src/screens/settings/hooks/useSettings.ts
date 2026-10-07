import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks';
import { storage } from '@/shared/utils/mmkv';
import { STORAGE_KEYS } from '@/shared/constants';
import { useAppDispatch, logout, useLogoutMutation } from '@/store';

export const useSettings = () => {
  const { t, i18n } = useTranslation();
  const { theme, mode, setMode } = useTheme();
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    storage.setString(STORAGE_KEYS.LANGUAGE, lang);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Fallback local session purge if backend is unreachable
      dispatch(logout());
    }
  };

  return {
    t,
    theme,
    mode,
    setMode,
    currentLanguage: i18n.language,
    handleLanguageChange,
    handleLogout,
  };
};
