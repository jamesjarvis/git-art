import React from 'react';
import GitContributionWall from '../GitContribution/GitContributionClasses';

export const gitWall = new GitContributionWall();

export const GitWallContext = React.createContext({ gitWall });
