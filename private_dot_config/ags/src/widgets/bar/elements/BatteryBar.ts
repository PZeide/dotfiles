import { Connectable } from "types/service";

const batteryService = await Service.import("battery");

// https://github.com/Aylur/dotfiles/blob/18b83b2d2c6ef2b9045edefe49a66959f93b358a/ags/widget/bar/buttons/BatteryBar.ts

function BatteryIcon() {
  return Widget.Icon({
    className: "indicator",
    setup: (self) => {
      self.hook(batteryService, () => {
        self.icon = batteryService.icon_name;
      });
    },
  });
}

function PercentageLabel() {
  return Widget.Label({
    label: batteryService.bind("percent").as((p) => `${p}%`),
  });
}

export function BatteryBar() {
  return Widget.Button({
    className: "element button",
    hexpand: false,
    visible: batteryService.bind("available"),
    child: Widget.Box({
      expand: true,
      child: Widget.Box({
        children: [BatteryIcon(), PercentageLabel()],
      }),
    }),
    setup: (self) => {
      self.hook(batteryService, () => {
        self.toggleClassName("charging", batteryService.charging);
        self.toggleClassName("low", batteryService.percent < 20);

        // TODO FIX BATTERY
        self.tooltipText = `${batteryService.time_remaining} seconds`;
      });
    },
  });
}
