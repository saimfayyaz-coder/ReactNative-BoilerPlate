import type { AccessibilityRole } from 'react-native';

export const ACCESSIBILITY_ROLES = {
  NONE: 'none',
  BUTTON: 'button',
  LINK: 'link',
  SEARCH: 'search',
  IMAGE: 'image',
  KEYBOARDKEY: 'keyboardkey',
  TEXT: 'text',
  ADJUSTABLE: 'adjustable',
  IMAGEBUTTON: 'imagebutton',
  HEADER: 'header',
  SUMMARY: 'summary',
  ALERT: 'alert',
  CHECKBOX: 'checkbox',
  COMBOBOX: 'combobox',
  MENU: 'menu',
  MENUBAR: 'menubar',
  MENUITEM: 'menuitem',
  PROGRESSBAR: 'progressbar',
  RADIO: 'radio',
  RADIOGROUP: 'radiogroup',
  SCROLLBAR: 'scrollbar',
  SPINBUTTON: 'spinbutton',
  SWITCH: 'switch',
  TAB: 'tab',
  TABBAR: 'tabbar',
  TABLIST: 'tablist',
  TIMER: 'timer',
  LIST: 'list',
  TOOLBAR: 'toolbar',
} as const satisfies Record<string, AccessibilityRole>;

export type AccessibilityRoleType =
  (typeof ACCESSIBILITY_ROLES)[keyof typeof ACCESSIBILITY_ROLES];

export const ACCESSIBILITY_LABELS = {
  BACK: 'Back',
  CLOSE: 'Close',
  SEARCH: 'Search',
  CLEAR_INPUT: 'Clear input',
  TOGGLE_PASSWORD: 'Toggle password visibility',
  MENU: 'Menu',
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
  DIRECT_MESSAGES: 'Direct messages',
  ADD: 'Add',
  SAVE: 'Save',
  DELETE: 'Delete',
  EDIT: 'Edit',
  REFRESH: 'Refresh',
  SELECT_LANGUAGE: 'Select language',
  PROFILE: 'Profile',
} as const;

export type AccessibilityLabelType =
  (typeof ACCESSIBILITY_LABELS)[keyof typeof ACCESSIBILITY_LABELS];
