import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export const navigationService = {
  navigate: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      (navigationRef.navigate as any)(name, params);
    }
  },

  push: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  },

  replace: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  },

  reset: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name, params }],
        }),
      );
    }
  },

  goBack: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },

  canGoBack: () => {
    return navigationRef.isReady() && navigationRef.canGoBack();
  },
};
