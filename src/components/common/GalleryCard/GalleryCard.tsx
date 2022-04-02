import React from 'react';
import { Card } from '@components/common';
import SixHatImg from '../../../../public/asset/6hat.png';
import RandomWordImg from '../../../../public/asset/randomWord.png';
import BrainWritingImg from '../../../../public/asset/brainWriting.png';
import styled from 'styled-components';

type GalleryCardType = {
  type: 'randomword' | 'brainwriting' | 'sixhat';
  title: string;
  subject: string;
};

type StyledProp = {
  Url: string;
};

const GalleryCard = ({ type, title, subject }: GalleryCardType) => {
  const ImageObj = {
    randomword: '/asset/randomWord.png',
    brainwriting: '/asset/brainWriting.png',
    sixhat: '/asset/6hat.png',
  };
  return (
    <Card width={350} height={260}>
      <>
        <Image Url={ImageObj[type]} />
        <TextWrapper>
          <Title>{title}</Title>
          <Subject>{subject}</Subject>
        </TextWrapper>
      </>
    </Card>
  );
};

const TextWrapper = styled.div`
  padding: 0px 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Image = styled.div<StyledProp>`
  width: 350px;
  height: 190px;
  background-image: url(${props => props.Url});
  background-size: cover;
  background-position: top;
`;

const Subject = styled.div``;

export { GalleryCard };
