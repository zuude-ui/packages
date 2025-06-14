export type IphoneSize = "sm" | "md" | "lg";
export type IphoneColor =
  | "natural-titanium"
  | "blue-titanium"
  | "white-titanium"
  | "black-titanium"
  | "blue"
  | "pink"
  | "yellow"
  | "green"
  | "black";

export type IphoneButtonsAction = {
  action?: () => void;
  volumeUp?: () => void;
  volumeDown?: () => void;
  power?: () => void;
};
