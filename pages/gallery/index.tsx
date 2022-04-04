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
      <Title>갤러리</Title>
      <Desc>다른 사람들의 랜덤워드, 브레인라이팅, 6hat thinking 결과물을 볼 수 있습니다. </Desc>
      <Grid>
        {galleryList.map(gallery => {
          return (
            <GalleryCard
              key={gallery.roomId}
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
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 10px;
`;

const Desc = styled.div`
  font-size: 18px;
  padding-bottom: 30px;
`;

const Grid = styled.div`
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 40px;
`;

export default Gallery;
