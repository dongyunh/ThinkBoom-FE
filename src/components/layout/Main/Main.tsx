import React from 'react';
import { NavWrapper } from './components';
import { HeaderBar, HatchCard } from 'components/common';
import { Button } from '@mui/material';

type MainType = {
  children: React.ReactChild;
};

const Main = ({ children }: MainType) => {
  return <div>{children}</div>;
};

Main.Card = HatchCard;
Main.HeaderBar = HeaderBar;
Main.NavWrapper = NavWrapper;
Main.Button = Button;

export { Main };
