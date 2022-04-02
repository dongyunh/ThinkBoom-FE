import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '@theme/styleTheme';

type DescProps = {
  text: string;
};

const Desc = ({ text }: DescProps) => {
  return <P>{text}</P>;
};

const P = styled.p`
  color: ${themedPalette.main_text1};
`;

export { Desc };
