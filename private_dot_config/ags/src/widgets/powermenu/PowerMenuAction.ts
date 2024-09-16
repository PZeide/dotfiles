import powerManagerService, { PowerAction } from "../../services/PowerManager";

function getPowerActionIcon(action: PowerAction): string {
  switch (action) {
    case "shutdown":
      return "system-shutdown-symbolic";
    case "reboot":
      return "system-reboot-symbolic";
    case "sleep":
      return "weather-clear-night-symbolic";
    case "lock":
      return "system-lock-screen-symbolic";
  }
}

function getPowerActionLabel(action: PowerAction): string {
  switch (action) {
    case "shutdown":
      return "Shutdown";
    case "reboot":
      return "Reboot";
    case "sleep":
      return "Sleep";
    case "lock":
      return "Lock";
  }
}

export function PowerMenuAction(action: PowerAction) {
  return Widget.Button({
    className: "action",
    onClicked: () => powerManagerService.execPowerAction(action),
    child: Widget.Box({
      vertical: true,
      className: "display",
      children: [
        Widget.Icon(getPowerActionIcon(action)),
        Widget.Label(getPowerActionLabel(action)),
      ],
    }),
  });
}
