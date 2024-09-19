import Gdk from "types/@girs/gdk-3.0/gdk-3.0";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Bar, BAR_NAME_PREFIX } from "./widgets/bar/Bar";
import {
  BarInsideCornerLeft,
  BarInsideCornerRight,
} from "./widgets/bar/BarCorner";
import { PowerMenu } from "./widgets/powermenu/PowerMenu";
import { range } from "./utils";
import Window from "types/widgets/window";

const multiMonitorWindows = [Bar, BarInsideCornerLeft, BarInsideCornerRight];

function updateMultiMonitorWindows() {
  const monitorsCount = Gdk.Display.get_default()?.get_n_monitors() || 1;
  for (const monitor of range(monitorsCount, 0)) {
    const barName = `${BAR_NAME_PREFIX}${monitor}`;

    // I don't want to use App.getWindow because it throws an ugly error if window is missing...
    if (!App.windows.some((window) => window.get_name() == barName)) {
      // Add every windows if bar is missing
      multiMonitorWindows
        .map((factory) => factory(monitor))
        .forEach(App.addWindow);
    }
  }
}

App.config({
  windows: [PowerMenu()],
});

updateMultiMonitorWindows();
Utils.idle(async () => {
  const display = Gdk.Display.get_default();

  display?.connect("monitor-added", () => updateMultiMonitorWindows());
  display?.connect("monitor-removed", () => updateMultiMonitorWindows());
});
