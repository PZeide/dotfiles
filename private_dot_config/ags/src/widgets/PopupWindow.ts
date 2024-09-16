import { type Widget } from "types/widgets/widget";
import { type WindowProps } from "types/widgets/window";

type LayoutPosition =
  | "center"
  | "top"
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

type Child = Widget<any>;

function Padding(
  name: string,
  { css = "", hexpand = true, vexpand = true } = {},
) {
  return Widget.EventBox({
    hexpand,
    vexpand,
    can_focus: false,
    child: Widget.Box({ css }),
    setup: (self) => self.on("button-press-event", () => App.closeWindow(name)),
  });
}

function Layout(layoutPosition: LayoutPosition, name: string, child: Child) {
  switch (layoutPosition) {
    case "center":
      return Widget.CenterBox(
        {},
        Padding(name),
        Widget.CenterBox(
          { vertical: true },
          Padding(name),
          child,
          Padding(name),
        ),
        Padding(name),
      );

    case "top":
      return Widget.CenterBox(
        {},
        Padding(name),
        Widget.Box({ vertical: true }, child, Padding(name)),
        Padding(name),
      );

    case "top-right":
      return Widget.Box(
        {},
        Padding(name),
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          child,
          Padding(name),
        ),
      );

    case "top-center":
      return Widget.Box(
        {},
        Padding(name),
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          child,
          Padding(name),
        ),
        Padding(name),
      );

    case "top-left":
      return Widget.Box(
        {},
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          child,
          Padding(name),
        ),
        Padding(name),
      );

    case "bottom-right":
      return Widget.Box(
        {},
        Padding(name),
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          Padding(name),
          child,
        ),
      );

    case "bottom-center":
      return Widget.Box(
        {},
        Padding(name),
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          Padding(name),
          child,
        ),
        Padding(name),
      );

    case "bottom-left":
      return Widget.Box(
        {},
        Widget.Box(
          {
            hexpand: false,
            vertical: true,
          },
          Padding(name),
          child,
        ),
        Padding(name),
      );
  }
}

type PopupWindowProps = Omit<WindowProps, "name" | "child"> & {
  name: string;
  child: Child;
  layout?: LayoutPosition;
};

export function PopupWindow({
  name,
  child,
  layout = "center",
  exclusivity = "ignore",
  ...props
}: PopupWindowProps) {
  return Widget.Window({
    name: name,
    setup: (self) => self.keybind("Escape", () => App.closeWindow(name)),
    visible: false,
    keymode: "on-demand",
    exclusivity: exclusivity,
    layer: "top",
    anchor: ["top", "bottom", "right", "left"],
    child: Layout(layout, name, child),
    ...props,
  });
}
