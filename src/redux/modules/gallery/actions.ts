import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailArgType } from './types';
import axios from 'axios';

const prefix = 'gallery';

export const getAllGallery = createAsyncThunk(`${prefix}/GET_ALL_GALLERY`, async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);

  return response.data;
});

export const getDetailGallery = createAsyncThunk(
  `${prefix}/GET_DETAIL_GALLERY`,
  async ({ category, roomId }: DetailArgType) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${category}/${roomId}`,
    );

    return response.data;
  },
);
