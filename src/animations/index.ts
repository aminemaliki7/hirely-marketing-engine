import type {CSSProperties} from "react";
import type {AnimationName} from "../types/video";
import {fade} from "./fade";
import {pop} from "./pop";
import {slideLeft, slideUp} from "./slide";
import {zoom} from "./zoom";

type MotionInput = {
  frame: number;
  fps: number;
};

export const getMotionStyle = (
  animation: AnimationName,
  input: MotionInput,
): CSSProperties => {
  switch (animation) {
    case "slide_up":
      return slideUp(input);
    case "slide_left":
      return slideLeft(input);
    case "pop":
      return pop(input);
    case "zoom":
      return zoom(input);
    case "fade":
    case "typewriter":
      return fade(input);
    default:
      return fade(input);
  }
};

export {fade} from "./fade";
export {pop} from "./pop";
export {slideLeft, slideUp} from "./slide";
export {typewriterCount} from "./typewriter";
export {zoom} from "./zoom";
