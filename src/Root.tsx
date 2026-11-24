import React from 'react';
import {Composition} from 'remotion';
import {FPS, TOTAL} from './data';
import {Main} from './Main';

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
);
