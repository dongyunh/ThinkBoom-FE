import React, { useEffect } from 'react';
import { GalleryCard } from '@components/common';
import styled from 'styled-components';
import { getAllGallery, gallerySelector } from '@redux/modules/gallery';
import { useAppSelector, useAppDispatch } from '@redux/hooks';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { galleryList } = useAppSelector(gallerySelector);

  useEffect(() => {
    dispatch(getAllGallery());
  }, []);
  return (
    <Container>
      <Grid>
        {galleryList.map(gallery => {
          return (
            <GalleryCard type={gallery.category} title={gallery.title} subject={gallery.subject} />
          );
        })}
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
