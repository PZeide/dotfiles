import { type TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import Gdk from "types/@girs/gdk-3.0/gdk-3.0";

const systemTrayService = await Service.import("systemtray");

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    className: "element button",
    tooltip_markup: item.bind("tooltip_markup"),
    child: Widget.Icon({ icon: item.bind("icon") }),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (button, _) =>
      item.menu?.popup_at_widget(
        button,
        Gdk.Gravity.SOUTH,
        Gdk.Gravity.NORTH,
        null,
      ),
  });
}

export function SystemTray() {
  return Widget.Box({
    className: "system-tray",
    hexpand: true,
    setup: (self) => {
      self.bind("children", systemTrayService, "items", (items: TrayItem[]) =>
        items.map(SystemTrayItem),
      );
    },
  });
}
