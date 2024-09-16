const notificationsService = await Service.import("notifications");

import { NotificationEntry } from "./NotificationEntry";

export function NotificationsPopup(monitor: number = 0) {
  const list = Widget.Box({
    vertical: true,
    children: notificationsService.popups.map(NotificationEntry),
  });

  function onNotified(_: unknown, id: number) {
    const notification = notificationsService.getNotification(id);
    if (notification) {
      console.log(id);
      list.children = [NotificationEntry(notification), ...list.children];
    }
  }

  function onDismissed(_: unknown, id: number) {
    list.children.find((candidate) => candidate.id === id)?.destroy();
  }

  list
    .hook(
      notificationsService as unknown as Connectable,
      onNotified,
      "notified",
    )
    .hook(
      notificationsService as unknown as Connectable,
      onDismissed,
      "dismissed",
    );

  return Widget.Window({
    monitor,
    name: `notifications_popup_${monitor}`,
    className: "notifications_popup",
    anchor: ["top", "right"],
    css: "padding: 100px;",
    child: list,
  });
}
