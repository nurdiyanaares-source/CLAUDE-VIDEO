import React from 'react';
import {Composition, Still} from 'remotion';
import {CoverA, CoverB} from './Cover';
import {FPS, TOTAL} from './data';
import {Main} from './Main';
import {PosterA4} from './PosterA4';

export const Root: React.FC = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
    <Still id="CoverA" component={CoverA} width={1080} height={1920} />
    <Still id="PosterA4" component={PosterA4} width={1240} height={1754} />
    <Still id="CoverB" component={CoverB} width={1080} height={1920} />
  </>
);
