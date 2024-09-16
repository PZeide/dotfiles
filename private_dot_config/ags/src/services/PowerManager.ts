export type PowerAction = "shutdown" | "reboot" | "sleep" | "lock";

class PowerManager extends Service {
  static {
    Service.register(this, {}, {});
  }

  execPowerAction(action: PowerAction) {
    App.closeWindow("ags_powermenu");

    switch (action) {
      case "shutdown":
        Utils.exec(["shutdown", "now"]);
        break;
      case "reboot":
        Utils.exec(["systemctl", "reboot"]);
        break;
      case "sleep":
        Utils.exec(["systemctl", "suspend"]);
        break;
      case "lock":
        Utils.exec(["loginctl", "lock-session"]);
        break;
    }
  }
}

const service = new PowerManager();
export default service;
