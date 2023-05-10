export type HeaderType = 'more' | 'charade' | 'dictionary' | 'dashboard'

export interface HeaderSideContentConfig {
  onPress: () => void;
  onLongPress: () => void;
  icon: string;
  indicator: boolean;
}
