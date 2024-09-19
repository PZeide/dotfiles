import { BatteryBar } from "./elements/BatteryBar";
import { Clock } from "./elements/Clock";
import { Media } from "./elements/Media";
import { PowerButton } from "./elements/PowerButton";
import { Workspaces } from "./elements/Workspaces";

export const BAR_NAME_PREFIX = "ags_bar_";

export function Bar(monitor: number = 0) {
  return Widget.Window({
    name: `${BAR_NAME_PREFIX}${monitor}`,
    monitor: monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      className: "bar",
      startWidget: Widget.Box({
        hpack: "start",
        children: [Workspaces(monitor)],
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: [Clock()],
      }),
      endWidget: Widget.Box({
        hexpand: true,
        hpack: "end",
        children: [Media(), BatteryBar(), PowerButton()],
      }),
    }),
  });
}
