import {staticFile} from "remotion";
import type {SoundName} from "../types/video";

export const SOUND_FILES: Record<SoundName, string> = {
  whoosh: staticFile("audio/whoosh.wav"),
  pop: staticFile("audio/pop.wav"),
  click: staticFile("audio/click.wav"),
  impact: staticFile("audio/impact.wav"),
  notification: staticFile("audio/notification.wav"),
};
