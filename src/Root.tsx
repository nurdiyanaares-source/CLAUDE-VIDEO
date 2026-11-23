import React from 'react';
import {Composition} from 'remotion';
import {HoyaEdit} from './HoyaEdit';
import {FPS, OUTRO_DURATION, SOURCE_DURATION} from './timeline';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HoyaEdit"
    component={HoyaEdit}
    durationInFrames={Math.round((SOURCE_DURATION + OUTRO_DURATION) * FPS)}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={{showSafeZone: false}}
  />
);
