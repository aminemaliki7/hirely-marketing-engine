import {interpolate} from "remotion";
import type {CSSProperties} from "react";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const slideUp = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}): CSSProperties => ({
  opacity: interpolate(frame, [0, Math.round(fps * 0.28)], [0, 1], clamp),
  transform: `translateY(${interpolate(frame, [0, Math.round(fps * 0.4)], [72, 0], clamp)}px)`,
});

export const slideLeft = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}): CSSProperties => ({
  opacity: interpolate(frame, [0, Math.round(fps * 0.28)], [0, 1], clamp),
  transform: `translateX(${interpolate(frame, [0, Math.round(fps * 0.4)], [96, 0], clamp)}px)`,
});
