import {interpolate, spring} from "remotion";
import type {CSSProperties} from "react";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const pop = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}): CSSProperties => {
  const scale = spring({
    frame,
    fps,
    config: {damping: 12, stiffness: 180, mass: 0.7},
  });
  return {
    opacity: interpolate(frame, [0, 4], [0, 1], clamp),
    transform: `scale(${interpolate(scale, [0, 1], [0.72, 1])})`,
  };
};
