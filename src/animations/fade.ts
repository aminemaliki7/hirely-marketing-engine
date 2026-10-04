import {interpolate} from "remotion";
import type {CSSProperties} from "react";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const fade = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}): CSSProperties => ({
  opacity: interpolate(frame, [0, Math.round(fps * 0.35)], [0, 1], clamp),
});
