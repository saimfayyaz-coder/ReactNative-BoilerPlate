import * as Keychain from 'react-native-keychain';

/**
 * Secure storage utility using hardware-backed OS Keychain / Keystore.
 * Best practice for sensitive credentials such as refresh tokens.
 */
export const secureStorage = {
  async set(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value, { service: key });
      return true;
    } catch (error) {
      console.warn(`[secureStorage] Failed to set "${key}":`, error);
      return false;
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ service: key });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.warn(`[secureStorage] Failed to get "${key}":`, error);
      return null;
    }
  },

  async remove(key: string): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({ service: key });
      return true;
    } catch (error) {
      console.warn(`[secureStorage] Failed to remove "${key}":`, error);
      return false;
    }
  },
};
