import React from "react";
import {Img, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {getMotionStyle} from "../animations";
import {typewriterCount} from "../animations/typewriter";
import type {Scene} from "../types/video";
import type {TemplateTheme} from "../templates";

export const AnimatedCopy: React.FC<{
  scene: Scene;
  theme: TemplateTheme;
  fontSize?: number;
}> = ({scene, theme, fontSize = 72}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const style = getMotionStyle(scene.animation, {frame, fps});
  const text =
    scene.animation === "typewriter"
      ? scene.text.slice(0, typewriterCount(scene.text, frame, fps))
      : scene.text;

  return (
    <div style={{...style, textAlign: "center", width: "100%"}}>
      <div
        style={{
          color: theme.text,
          fontSize,
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: -1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
      {scene.subtext ? (
        <div
          style={{
            marginTop: 28,
            color: theme.muted,
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.35,
          }}
        >
          {scene.subtext}
        </div>
      ) : null}
    </div>
  );
};

export const SceneImage: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const style = getMotionStyle("zoom", {frame, fps});
  const file = src.startsWith("http") ? src : staticFile(src);

  return (
    <div style={{...style, width: "100%", display: "flex", justifyContent: "center"}}>
      <Img
        src={file}
        style={{
          width: 860,
          height: 520,
          objectFit: "cover",
          borderRadius: 32,
        }}
      />
    </div>
  );
};
