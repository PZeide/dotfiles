import { Connectable } from "types/service";

const batteryService = await Service.import("battery");

// https://github.com/Aylur/dotfiles/blob/18b83b2d2c6ef2b9045edefe49a66959f93b358a/ags/widget/bar/buttons/BatteryBar.ts

function Indicator() {
  return Widget.Icon({
    className: "indicator",
    setup: (self) => {
      self.hook(batteryService, () => {
        self.icon = batteryService.icon_name;
      });
    },
  });
}

export function BatteryBar() {
  return Widget.Button({
    className: "button",
  });
}
