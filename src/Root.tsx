import React from 'react';
import {Composition, Still} from 'remotion';
import {CoverA, CoverB} from './Cover';
import {FPS, TOTAL} from './data';
import {Main} from './Main';

export const Root: React.FC = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
    <Still id="CoverA" component={CoverA} width={1080} height={1920} />
    <Still id="CoverB" component={CoverB} width={1080} height={1920} />
  </>
);
