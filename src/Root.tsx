import React from "react";
import {Composition} from "remotion";
import {Short, shortDurationInFrames} from "./compositions/Short";
import {VIDEO} from "./theme";
import {videoSchema, type VideoScript} from "./types/video";
import dontApply from "../examples/dont-apply.json";
import atsMatching from "../examples/ats-matching.json";

const careerTipExample = dontApply as VideoScript;
const atsExample = atsMatching as VideoScript;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Short"
        component={Short}
        durationInFrames={VIDEO.fps * 18}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        schema={videoSchema}
        defaultProps={careerTipExample}
        calculateMetadata={({props}) => ({
          durationInFrames: shortDurationInFrames(props),
        })}
      />
      <Composition
        id="ATSMatching"
        component={Short}
        durationInFrames={VIDEO.fps * 20}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        schema={videoSchema}
        defaultProps={atsExample}
        calculateMetadata={({props}) => ({
          durationInFrames: shortDurationInFrames(props),
        })}
      />
    </>
  );
};
