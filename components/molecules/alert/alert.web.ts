import {
  type AlertType,
  type AlertButton,
  type AlertOptions,
} from "react-native";

import Swal from "sweetalert2";

export type CustomAlertButton = AlertButton & {
  swalType?: "deny" | "cancel" | "confirm";
};

class Alert {
  static alert(
    title: string,
    message?: string,
    buttons?: CustomAlertButton[],
    options?: AlertOptions
  ): void {
    const confirmButton = buttons
      ? buttons.find((button) => button.swalType === "confirm")
      : undefined;
    const denyButton = buttons
      ? buttons.find((button) => button.swalType === "deny")
      : undefined;
    const cancelButton = buttons
      ? buttons.find((button) => button.swalType === "cancel")
      : undefined;

    Swal.fire({
      title: title,
      text: message,
      showConfirmButton: !!confirmButton,
      showDenyButton: !!denyButton,
      showCancelButton: !!cancelButton,
      confirmButtonText: confirmButton?.text,
      denyButtonText: denyButton?.text,
      cancelButtonText: cancelButton?.text,
    }).then((result) => {
      if (result.isConfirmed) {
        if (confirmButton?.onPress !== undefined) {
          confirmButton.onPress();
        }
      } else if (result.isDenied) {
        if (denyButton?.onPress !== undefined) {
          denyButton.onPress();
        }
      } else if (result.isDismissed) {
        if (cancelButton?.onPress !== undefined) {
          cancelButton.onPress();
        }
      }
    });
  }

  static prompt(
    title: string,
    message?: string,
    callbackOrButtons?: ((text: string) => void) | CustomAlertButton[],
    type?: AlertType,
    defaultValue?: string,
    keyboardType?: string
  ): void {
    throw new Error("Not implemented.");
  }
}

export default Alert;
