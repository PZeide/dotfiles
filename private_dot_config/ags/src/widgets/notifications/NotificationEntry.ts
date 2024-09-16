import { Notification } from "resource:///com/github/Aylur/ags/service/notifications.js";
import { NotificationIcon } from "./NotificationIcon";

export function NotificationEntry(notification: Notification) {
  return Widget.EventBox(
    {
      on_primary_click: notification.dismiss,
    },
    Widget.Box({
      className: `notification ${notification.urgency}`,
      vertical: true,
      children: [
        Widget.Box({
          children: [
            NotificationIcon(notification),
            Widget.Label(notification.summary),
          ],
        }),
        Widget.Box({
          className: "actions-box",
          children: notification.actions.map((action) =>
            Widget.Button({
              className: "action",
              hexpand: true,
              on_clicked: () => notification.invoke(action.id),
              child: Widget.Label(action.label),
            }),
          ),
        }),
      ],
    }),
  );
}
