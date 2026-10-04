import React from "react";
import {AbsoluteFill} from "remotion";
import {BRAND} from "../theme";
import type {TemplateTheme} from "./index";

export const CareerTip: React.FC<{
  theme: TemplateTheme;
  children: React.ReactNode;
}> = ({theme, children}) => {
  return (
    <AbsoluteFill style={{backgroundColor: theme.background}}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(10,102,194,0.28), transparent 42%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const HirelyLogo: React.FC<{
  color?: string;
  size?: number;
}> = ({color = BRAND.white, size = 42}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -1.2,
        color,
      }}
    >
      <div
        style={{
          width: size * 0.95,
          height: size * 0.95,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: BRAND.white,
          fontSize: size * 0.48,
        }}
      >
        H
      </div>
      Hirely
    </div>
  );
};
