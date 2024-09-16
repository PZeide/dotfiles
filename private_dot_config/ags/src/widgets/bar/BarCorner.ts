import Cairo from "gi://cairo?version=1.0";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const dummyRegion = new Cairo.Region();

export function BarInsideCornerLeft(monitor: number = 0) {
  return Widget.Window({
    name: `ags_barcorner_l_${monitor}`,
    monitor: monitor,
    layer: "top",
    anchor: ["top", "left"],
    exclusivity: "normal",
    child: BarCorner("left"),
    setup: (self: Gtk.Window) => {
      self.input_shape_combine_region(dummyRegion);
    },
  });
}

export function BarInsideCornerRight(monitor: number = 0) {
  return Widget.Window({
    name: `ags_barcorner_r_${monitor}`,
    monitor: monitor,
    layer: "top",
    anchor: ["top", "right"],
    exclusivity: "normal",
    child: BarCorner("right"),
    setup: (self: Gtk.Window) => {
      self.input_shape_combine_region(dummyRegion);
    },
  });
}

export function BarCorner(pos: "left" | "right") {
  return Widget.DrawingArea({
    className: "bar-corner",
    hpack: pos === "left" ? "start" : "end",
    vpack: "start",
    setup: (widget: Gtk.Widget) => {
      const radius = widget
        .get_style_context()
        .get_property("border-radius", Gtk.StateFlags.NORMAL);

      widget.set_size_request(radius, radius);

      widget.connect("draw", (widget, context) => {
        const color = widget
          .get_style_context()
          .get_property("background-color", Gtk.StateFlags.NORMAL);

        const radius = widget
          .get_style_context()
          .get_property("border-radius", Gtk.StateFlags.NORMAL);

        widget.set_size_request(radius, radius);

        if (pos == "left") {
          context.arc(radius, radius, radius, Math.PI, (3 * Math.PI) / 2);
          context.lineTo(0, 0);
        } else {
          context.arc(0, radius, radius, (3 * Math.PI) / 2, 2 * Math.PI);
          context.lineTo(radius, 0);
        }

        context.closePath();
        context.setSourceRGBA(color.red, color.green, color.blue, color.alpha);
        context.fill();
      });
    },
  });
}
