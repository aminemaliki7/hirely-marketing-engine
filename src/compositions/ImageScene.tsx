import React from "react";
import {AbsoluteFill} from "remotion";
import type {Scene} from "../types/video";
import type {TemplateTheme} from "../templates";
import {AnimatedCopy, SceneImage} from "./AnimatedCopy";

export const ImageScene: React.FC<{
  scene: Scene;
  theme: TemplateTheme;
}> = ({scene, theme}) => {
  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
        gap: 48,
      }}
    >
      {scene.image ? <SceneImage src={scene.image} /> : null}
      <AnimatedCopy scene={scene} theme={theme} fontSize={56} />
    </AbsoluteFill>
  );
};
