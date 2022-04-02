import React from 'react';
import { GalleryCard } from '@components/common';
import styled from 'styled-components';

const Gallery = () => {
  return (
    <Container>
      <Grid>
        <GalleryCard type="brainwriting" title="제목" subject="주제" />
        <GalleryCard type="sixhat" title="제목" subject="주제" />
        <GalleryCard type="randomword" title="제목" subject="주제" />
        <GalleryCard type="brainwriting" title="제목" subject="주제" />
        <GalleryCard type="sixhat" title="제목" subject="주제" />
        <GalleryCard type="randomword" title="제목" subject="주제" />
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 150px;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 40px;
`;

export default Gallery;
