import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {getMotionStyle} from "../animations";
import {BRAND} from "../theme";
import {HirelyLogo} from "../templates/CareerTip";
import type {Scene} from "../types/video";
import type {TemplateTheme} from "../templates";

export const CTA: React.FC<{
  scene: Scene;
  theme: TemplateTheme;
}> = ({scene, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const style = getMotionStyle(scene.animation, {frame, fps});
  const isLight = theme.background === BRAND.lightBg;
  const isBrandLine = /^hirely(\.ma)?$/i.test(scene.text.trim());

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      <div style={{...style, textAlign: "center"}}>
        <HirelyLogo color={isLight ? "#0F172A" : BRAND.white} size={54} />
        <div
          style={{
            marginTop: 36,
            color: theme.text,
            fontSize: isBrandLine ? 52 : 64,
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          {isBrandLine ? "Check the match before you apply." : scene.text}
        </div>
        {scene.subtext ? (
          <div
            style={{
              marginTop: 24,
              color: theme.muted,
              fontSize: 34,
              fontWeight: 500,
            }}
          >
            {scene.subtext}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 48,
            display: "inline-flex",
            padding: "18px 36px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
            color: BRAND.white,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 0.4,
          }}
        >
          {BRAND.cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
