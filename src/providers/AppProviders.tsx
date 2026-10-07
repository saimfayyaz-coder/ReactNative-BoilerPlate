import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { store, persistor } from '@/store';
import { ThemeProvider } from './ThemeProvider';
import { AppInitializer } from './AppInitializer';
import { ToastOverlay } from '@/shared/components';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider>
                <AppInitializer>
                  {children}
                </AppInitializer>
                <ToastOverlay />
              </ThemeProvider>
            </PersistGate>
          </ReduxProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
