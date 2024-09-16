import { range } from "src/utils";
import Gdk from "types/@girs/gdk-3.0/gdk-3.0";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const hyprland = await Service.import("hyprland");

// There is 9 workspaces per monitor (configured in hyprsplit)
const workspacesCountPerMonitor = 9;

function moveToWorkspace(commandOrWorkspace: string | number) {
  Utils.exec(`hyprctl dispatch split:workspace ${commandOrWorkspace}`);
}

function toggleOverview() {
  Utils.exec("hyprctl dispatch overview:toggle");
}

function Workspace(monitor: number, workspace: number) {
  return Widget.Label({
    vpack: "center",
    label: `${workspace}`,
    setup: (self) =>
      self.hook(hyprland, () => {
        self.toggleClassName(
          "active",
          hyprland.getMonitor(monitor)?.activeWorkspace?.id === workspace,
        );
        self.toggleClassName(
          "occupied",
          (hyprland.getWorkspace(workspace)?.windows || 0) > 0,
        );
      }),
  });
}

export function Workspaces(monitor: number) {
  return Widget.Button({
    className: "element button workspaces",
    hexpand: true,
    on_scroll_up: () => moveToWorkspace("r+1"),
    on_scroll_down: () => moveToWorkspace("r-1"),
    on_clicked: () => toggleOverview(),
    child: Widget.Box({
      children: range(workspacesCountPerMonitor, monitor * 9 + 1).map((i) =>
        Workspace(monitor, i),
      ),
    }),
  });
}
