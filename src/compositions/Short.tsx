import React from "react";
import {AbsoluteFill, Audio, Sequence} from "remotion";
import {loadFont} from "@remotion/google-fonts/Inter";
import {SOUND_FILES} from "../audio/sounds";
import {scenesDurationInFrames, secondsToFrames, withSceneRoles} from "../lib/timing";
import {resolveTemplate} from "../templates";
import {HirelyLogo} from "../templates/CareerTip";
import {BRAND, VIDEO} from "../theme";
import type {Scene, VideoScript} from "../types/video";
import {CTA} from "./CTA";
import {HookScene} from "./HookScene";
import {ImageScene} from "./ImageScene";
import {TextScene} from "./TextScene";

const {fontFamily} = loadFont("normal", {
  weights: ["500", "700", "800"],
  subsets: ["latin"],
});

const SceneBody: React.FC<{scene: Scene; theme: ReturnType<typeof resolveTemplate>}> = ({
  scene,
  theme,
}) => {
  if (scene.image) {
    return <ImageScene scene={scene} theme={theme} />;
  }
  if (scene.role === "hook") {
    return <HookScene scene={scene} theme={theme} />;
  }
  if (scene.role === "cta") {
    return <CTA scene={scene} theme={theme} />;
  }
  return <TextScene scene={scene} theme={theme} />;
};

export const Short: React.FC<VideoScript> = (script) => {
  const theme = resolveTemplate(script);
  const scenes = withSceneRoles(script);
  const isLight = theme.background === BRAND.lightBg;
  let from = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          background: isLight
            ? `radial-gradient(circle at 80% 0%, rgba(10,102,194,0.16), transparent 38%)`
            : `radial-gradient(circle at 18% 8%, ${theme.accent}33, transparent 42%)`,
        }}
      />
      {script.template === "AIExplainer" ? (
        <AbsoluteFill
          style={{
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          padding: "72px 64px",
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div
            style={{
              background: theme.badgeBg,
              color: theme.accent,
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1.6,
            }}
          >
            {theme.label}
          </div>
          <HirelyLogo color={isLight ? "#0F172A" : BRAND.white} size={28} />
        </div>
      </AbsoluteFill>
      {scenes.map((scene, index) => {
        const durationInFrames = secondsToFrames(scene.duration, VIDEO.fps);
        const start = from;
        from += durationInFrames;
        return (
          <Sequence key={`${scene.text}-${index}`} from={start} durationInFrames={durationInFrames}>
            {scene.sound ? <Audio src={SOUND_FILES[scene.sound]} /> : null}
            <SceneBody scene={scene} theme={theme} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const shortDurationInFrames = (script: VideoScript): number =>
  scenesDurationInFrames(script.scenes, VIDEO.fps);
