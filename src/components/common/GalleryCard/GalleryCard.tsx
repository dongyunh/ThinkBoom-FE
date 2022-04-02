import React from 'react';
import { Card } from '@components/common';
import Image from 'next/image';
import SixHatImg from '../../../../public/asset/6hat.png';
import RandomWordImg from '../../../../public/asset/randomWord.png';
import BrainWritingImg from '../../../../public/asset/brainWriting.png';
import styled from 'styled-components';

type GalleryCardType = {
  type: 'randomword' | 'brainwriting' | 'sixhat';
  title: string;
  subject: string;
};

const GalleryCard = ({ type, title, subject }: GalleryCardType) => {
  const ImageObj = {
    randomword: RandomWordImg,
    brainwriting: BrainWritingImg,
    sixhat: SixHatImg,
  };
  return (
    <Card width={350} height={250}>
      <>
        <Image src={ImageObj[type]} width={350} height={180} />
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

const Subject = styled.div``;

export { GalleryCard };
