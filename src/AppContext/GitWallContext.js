import React from 'react';
import GitContributionWall from '../GitContributionComponent/GitContributionClass';


export const gitWall = new GitContributionWall();

export const GitWallContext = React.createContext({gitWall});