import React from 'react';
import { AppProviders } from '@/providers';
import { RootNavigator } from '@/navigation';
import '@/shared/translations';

export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
