import { ReactNode } from "react";

type PositionT =
  | "top-right"
  | "top-left"
  | "top-center"
  | "center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";
type PositionSizeT = "sm" | "md" | "lg";
type VariantsPropsT =
  | "default"
  | "outlined"
  | "filled"
  | "ghost"
  | "danger"
  | "success"
  | "warning";
type BehaviorVariantsT = "tooltip" | "dropdown" | "persistent" | "dismissible";
type AnimationVariantsT =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "zoom-in"
  | "none";
export interface PopupPropsT {
  children?: ReactNode;
  position?: PositionT;
  size?: PositionSizeT;
  variant?: VariantsPropsT;
  behavior?: BehaviorVariantsT;
  animation?: AnimationVariantsT;
  id: string;
}
