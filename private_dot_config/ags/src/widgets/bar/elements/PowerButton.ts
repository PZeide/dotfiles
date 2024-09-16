export function PowerButton() {
  return Widget.Button({
    className: "element button",
    onClicked: () => {
      App.toggleWindow("ags_powermenu");
    },
    child: Widget.Icon("system-shutdown-symbolic"),
  });
}
