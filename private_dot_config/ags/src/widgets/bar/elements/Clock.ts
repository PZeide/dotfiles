import GLib from "types/@girs/glib-2.0/glib-2.0";

const time = Variable("", {
  poll: [1000, () => GLib.DateTime.new_now_local().format("%H:%M")],
});

const date = Variable("", {
  poll: [1000, () => GLib.DateTime.new_now_local().format("%A, %d/%m")],
});

export function Clock() {
  return Widget.Box({
    className: "element clock",
    children: [
      Widget.Label({
        className: "time",
        label: time.bind(),
      }),
      Widget.Label({
        className: "separator",
        label: "•",
      }),
      Widget.Label({
        className: "date",
        label: date.bind(),
      }),
    ],
  });
}
