import { Connectable } from "types/service";
import { type MprisPlayer } from "types/service/mpris";

const mprisService = await Service.import("mpris");

const preferredPlayer = "cider";
function getPlayer(): MprisPlayer {
  return (
    mprisService.getPlayer(preferredPlayer) || mprisService.players[0] || null
  );
}

const defaultAudioIcon = "audio-x-generic-symbolic";
const iconOverrides = {
  "": "cider", // cider reports incorrectly as empty
  "zen-alpha": "zen-browser", // desktop entry is zen-alpha but icon is zen-browser
};

function getPlayerIcon(entry: string) {
  let icon = defaultAudioIcon;
  if (iconOverrides[entry]) {
    icon = iconOverrides[entry];
  } else if (Utils.lookUpIcon(`${entry}-symbolic`)) {
    icon = `${entry}-symbolic`;
  } else if (Utils.lookUpIcon(entry)) {
    icon = entry;
  }

  return icon;
}

function PlayerIcon(player: MprisPlayer) {
  return Widget.Icon({
    icon: Utils.merge([player.bind("entry")], (entry) => getPlayerIcon(entry)),
  });
}

function MediaInfo(player: MprisPlayer) {
  return Widget.Revealer({
    click_through: true,
    className: "media-revealer",
    transition: "slide_right",
    setup: (self) => {
      let currentTrack = "";
      self.hook(player, () => {
        if (currentTrack === player.trackid) return;

        currentTrack = player.trackid;
        self.reveal_child = true;

        Utils.timeout(3000, () => {
          if (!self.is_destroyed) self.reveal_child = false;
        });
      });
    },
    child: Widget.Label({
      truncate: "end",
      max_width_chars: 35,
      label: Utils.merge(
        [player.bind("track_artists"), player.bind("track_title")],
        () => `${player.track_artists.join(", ")} - ${player.track_title}`,
      ),
    }),
  });
}

function MediaContent(player: MprisPlayer) {
  return Widget.Box({
    children: [PlayerIcon(player), MediaInfo(player)],
  });
}

export function Media() {
  let player = getPlayer();

  const noPlayerChild = Widget.Icon(defaultAudioIcon);
  const mediaWidget = Widget.Button({
    className: "element button",
    visible: player != null,
    hexpand: true,
    child: noPlayerChild,
  });

  mediaWidget.hook(
    mprisService as unknown as Connectable,
    () => {
      const player = getPlayer();
      if (!player) {
        mediaWidget.visible = false;
        return;
      }

      mediaWidget.visible = true;
      mediaWidget.child = MediaContent(player);
      const revealer = mediaWidget.child.children[1];

      mediaWidget.on_clicked = () => player.playPause();
      mediaWidget.on_secondary_click = () => player.playPause();
      mediaWidget.on_scroll_up = () => player.next();
      mediaWidget.on_scroll_down = () => player.previous();

      mediaWidget.on_hover = () => {
        revealer.reveal_child = true;
        return false;
      };

      mediaWidget.on_hover_lost = () => {
        revealer.reveal_child = false;
        return false;
      };
    },
    "notify::players",
  );

  return mediaWidget;
}
