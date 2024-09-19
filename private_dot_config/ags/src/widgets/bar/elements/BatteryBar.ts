const batteryService = await Service.import("battery");

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
