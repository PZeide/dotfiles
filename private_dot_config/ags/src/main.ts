import Gdk from "types/@girs/gdk-3.0/gdk-3.0";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Bar } from "./widgets/bar/Bar";
import {
  BarInsideCornerLeft,
  BarInsideCornerRight,
} from "./widgets/bar/BarCorner";
import { PowerMenu } from "./widgets/powermenu/PowerMenu";
import { range } from "./utils";
import Window from "types/widgets/window";

function forAllMonitors(
  windowFactory: (monitor: number) => Window<unknown, unknown>,
): Window<unknown, unknown>[] {
  const monitorsCount = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(monitorsCount, 0).map(windowFactory);
}

const appWindows = [
  forAllMonitors(Bar),
  forAllMonitors(BarInsideCornerLeft),
  forAllMonitors(BarInsideCornerRight),
  PowerMenu(),
].flat(1);

App.config({
  windows: appWindows,
});
