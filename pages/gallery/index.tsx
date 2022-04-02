import React, { useEffect } from 'react';
import { GalleryCard } from '@components/common';
import styled from 'styled-components';
import { getAllGallery, gallerySelector } from '@redux/modules/gallery';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { useRouter } from 'next/router';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { galleryList } = useAppSelector(gallerySelector);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllGallery());
  }, []);

  const handleRouting = (category: string, roomId: string) => {
    router.push(`/gallery/detail/${category}/${roomId}`);
  };

  return (
    <Container>
      <Grid>
        {galleryList.map(gallery => {
          return (
            <GalleryCard
              type={gallery.category}
              title={gallery.title}
              subject={gallery.subject}
              onClick={() => handleRouting(gallery.category, gallery.roomId)}
            />
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
