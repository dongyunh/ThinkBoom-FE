import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const GalleryIcon = () => {
  return (
    <Link href="/gallery">
      <a>
        <Image />
      </a>
    </Link>
  );
};

const Image = styled.div`
  width: 60px;
  height: 60px;
  background-size: contain;
  background-image: url('/asset/IC_gallery.png');
  background-repeat: no-repeat;
  background-position: center;
  :hover {
    background-image: url('/asset/IC_gallery-hover.png');
  }
`;

export { GalleryIcon };
