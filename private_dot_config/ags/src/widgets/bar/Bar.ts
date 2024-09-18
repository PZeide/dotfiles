import { BatteryBar } from "./elements/BatteryBar";
import { Clock } from "./elements/Clock";
import { Media } from "./elements/Media";
import { PowerButton } from "./elements/PowerButton";
import { Workspaces } from "./elements/Workspaces";

export function Bar(monitor: number = 0) {
  return Widget.Window({
    name: `ags_bar_${monitor}`,
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
