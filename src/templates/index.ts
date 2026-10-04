import {BRAND} from "../theme";
import type {TemplateName, VideoScript} from "../types/video";

export type TemplateTheme = {
  id: TemplateName;
  label: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  badgeBg: string;
};

export const TEMPLATES: Record<TemplateName, TemplateTheme> = {
  CareerTip: {
    id: "CareerTip",
    label: "CAREER TIP",
    background: BRAND.darkBg,
    surface: BRAND.darkSurface,
    text: BRAND.white,
    muted: BRAND.mutedDark,
    accent: BRAND.primary,
    badgeBg: "rgba(10,102,194,0.22)",
  },
  JobAlert: {
    id: "JobAlert",
    label: "JOB ALERT",
    background: "#08101C",
    surface: "#132033",
    text: BRAND.white,
    muted: BRAND.mutedDark,
    accent: BRAND.primary,
    badgeBg: "rgba(10,102,194,0.28)",
  },
  AIExplainer: {
    id: "AIExplainer",
    label: "AI MATCHING",
    background: "#050816",
    surface: "#111827",
    text: BRAND.white,
    muted: BRAND.mutedDark,
    accent: BRAND.accent,
    badgeBg: "rgba(56,189,248,0.16)",
  },
  ProductPromo: {
    id: "ProductPromo",
    label: "HIRELY",
    background: BRAND.lightBg,
    surface: BRAND.lightSurface,
    text: "#0F172A",
    muted: BRAND.mutedLight,
    accent: BRAND.secondary,
    badgeBg: "rgba(30,64,175,0.12)",
  },
};

export const resolveTemplate = (script: VideoScript): TemplateTheme => {
  const base = TEMPLATES[script.template];
  if (script.theme === "light") {
    return {
      ...base,
      background: BRAND.lightBg,
      surface: BRAND.lightSurface,
      text: "#0F172A",
      muted: BRAND.mutedLight,
    };
  }
  if (script.theme === "dark") {
    return {
      ...base,
      background: BRAND.darkBg,
      surface: BRAND.darkSurface,
      text: BRAND.white,
      muted: BRAND.mutedDark,
    };
  }
  return base;
};
