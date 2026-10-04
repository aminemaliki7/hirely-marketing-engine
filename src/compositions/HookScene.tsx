import React from "react";
import {AbsoluteFill} from "remotion";
import type {Scene} from "../types/video";
import type {TemplateTheme} from "../templates";
import {AnimatedCopy} from "./AnimatedCopy";

export const HookScene: React.FC<{
  scene: Scene;
  theme: TemplateTheme;
}> = ({scene, theme}) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 88px",
      }}
    >
      <div
        style={{
          width: 88,
          height: 10,
          borderRadius: 99,
          background: theme.accent,
          marginBottom: 36,
        }}
      />
      <AnimatedCopy scene={scene} theme={theme} fontSize={84} />
    </AbsoluteFill>
  );
};
