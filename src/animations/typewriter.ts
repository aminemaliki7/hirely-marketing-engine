import {interpolate} from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const typewriterCount = (
  text: string,
  frame: number,
  fps: number,
): number => {
  const revealFrames = Math.max(8, Math.round(fps * 0.7));
  return Math.round(
    interpolate(frame, [0, revealFrames], [0, text.length], clamp),
  );
};
