import * as Haptics from "expo-haptics";

export const triggerHaptics = (type?: HapticsType) => {
  Haptics.notificationAsync(type || Haptics.NotificationFeedbackType.Success);
};

export type HapticsType =
  | Haptics.NotificationFeedbackType.Success
  | Haptics.NotificationFeedbackType.Warning
  | Haptics.NotificationFeedbackType.Error;
