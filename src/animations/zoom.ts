import {interpolate} from "remotion";
import type {CSSProperties} from "react";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const zoom = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}): CSSProperties => ({
  opacity: interpolate(frame, [0, Math.round(fps * 0.3)], [0, 1], clamp),
  transform: `scale(${interpolate(frame, [0, Math.round(fps * 0.55)], [0.84, 1], clamp)})`,
});
