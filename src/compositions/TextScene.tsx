import React from "react";
import {AbsoluteFill} from "remotion";
import type {Scene} from "../types/video";
import type {TemplateTheme} from "../templates";
import {AnimatedCopy} from "./AnimatedCopy";

export const TextScene: React.FC<{
  scene: Scene;
  theme: TemplateTheme;
}> = ({scene, theme}) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 92px",
      }}
    >
      <AnimatedCopy scene={scene} theme={theme} fontSize={68} />
    </AbsoluteFill>
  );
};
