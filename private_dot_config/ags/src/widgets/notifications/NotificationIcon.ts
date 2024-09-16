import { Notification } from "resource:///com/github/Aylur/ags/service/notifications.js";

export function NotificationIcon(notification: Notification): Widget<unknown> {
  if (notification.image) {
    // Use custom image from notification metadata
    return Widget.Box({
      css: `
          background-image: url("${notification.image}");
          background-size: contain;
          bacjgroun-repeat: no-repeat;
          background-position: center;
        `,
    });
  }

  let icon = "dialog-information-symbolic";
  if (Utils.lookUpIcon(notification.app_icon)) {
    icon = notification.app_icon;
  } else if (
    notification.app_entry &&
    Utils.lookUpIcon(notification.app_entry)
  ) {
    icon = notification.app_entry;
  }

  return Widget.Icon(icon);
}
