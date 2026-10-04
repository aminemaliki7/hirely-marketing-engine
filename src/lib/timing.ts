import {VIDEO} from "../theme";
import type {Scene, SceneRole, VideoScript} from "../types/video";

export const secondsToFrames = (seconds: number, fps = VIDEO.fps): number =>
  Math.max(1, Math.round(seconds * fps));

export const scenesDurationInFrames = (
  scenes: Scene[],
  fps = VIDEO.fps,
): number => scenes.reduce((total, scene) => total + secondsToFrames(scene.duration, fps), 0);

const ROLE_CYCLE: SceneRole[] = ["problem", "insight", "example"];

export const withSceneRoles = (script: VideoScript): Scene[] => {
  const lastIndex = script.scenes.length - 1;
  return script.scenes.map((scene, index) => {
    if (scene.role) {
      return scene;
    }
    if (index === 0) {
      return {...scene, role: "hook"};
    }
    if (index === lastIndex) {
      return {...scene, role: "cta"};
    }
    return {...scene, role: ROLE_CYCLE[(index - 1) % ROLE_CYCLE.length]};
  });
};
