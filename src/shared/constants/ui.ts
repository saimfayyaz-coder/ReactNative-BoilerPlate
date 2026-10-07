export const APP_ICONS = {
  CHECKMARK_CIRCLE: 'checkmark-circle',
  CLOSE_CIRCLE: 'close-circle',
  CHECKMARK: 'checkmark',
  CHEVRON_DOWN: 'chevron-down',
  CHEVRON_FORWARD: 'chevron-forward',
  CHEVRON_BACK: 'chevron-back',
  LINK: 'link-outline',
  CAMERA: 'camera-outline',
  IMAGES: 'images-outline',
  TRASH: 'trash-outline',
  ADD: 'add',
  EYE: 'eye-outline',
  EYE_OFF: 'eye-off-outline',
  SEARCH: 'search-outline',
  SETTINGS: 'settings-outline',
  HEART: 'heart-outline',
  HEART_FILLED: 'heart',
  CHATBUBBLE: 'chatbubble-outline',
  SHARE: 'paper-plane-outline',
  BOOKMARK: 'bookmark-outline',
} as const;

export type AppIconName = (typeof APP_ICONS)[keyof typeof APP_ICONS];
