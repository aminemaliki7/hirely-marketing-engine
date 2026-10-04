import {z} from "zod";

export const ANIMATIONS = [
  "fade",
  "slide_up",
  "slide_left",
  "pop",
  "zoom",
  "typewriter",
] as const;

export const SOUNDS = [
  "whoosh",
  "pop",
  "click",
  "impact",
  "notification",
] as const;

export const TEMPLATES = [
  "CareerTip",
  "JobAlert",
  "AIExplainer",
  "ProductPromo",
] as const;

export const SCENE_ROLES = [
  "hook",
  "problem",
  "insight",
  "example",
  "cta",
] as const;

export const animationSchema = z.enum(ANIMATIONS);
export const soundSchema = z.enum(SOUNDS);
export const templateSchema = z.enum(TEMPLATES);
export const sceneRoleSchema = z.enum(SCENE_ROLES);

export const sceneSchema = z.object({
  duration: z.number().min(0.5).max(20),
  text: z.string().min(1),
  subtext: z.string().optional(),
  animation: animationSchema.default("fade"),
  sound: soundSchema.optional(),
  image: z.string().optional(),
  role: sceneRoleSchema.optional(),
});

export const videoSchema = z.object({
  template: templateSchema.default("CareerTip"),
  title: z.string().min(1),
  duration: z.number().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  scenes: z.array(sceneSchema).min(1),
});

export type AnimationName = z.infer<typeof animationSchema>;
export type SoundName = z.infer<typeof soundSchema>;
export type TemplateName = z.infer<typeof templateSchema>;
export type SceneRole = z.infer<typeof sceneRoleSchema>;
export type Scene = z.infer<typeof sceneSchema>;
export type VideoScript = z.infer<typeof videoSchema>;
