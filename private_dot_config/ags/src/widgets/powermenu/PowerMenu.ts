import { PowerMenuAction } from "./PowerMenuAction";
import { PopupWindow } from "../PopupWindow";

export function PowerMenu() {
  return PopupWindow({
    name: "ags_powermenu",
    child: Widget.Box({
      className: "powermenu",
      children: [
        PowerMenuAction("shutdown"),
        PowerMenuAction("reboot"),
        PowerMenuAction("sleep"),
        PowerMenuAction("lock"),
      ],
    }),
  });
}
