import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailArgType, PaginationInfo } from './types';
import axios from 'axios';

const prefix = 'gallery';

export const getAllGallery = createAsyncThunk(
  `${prefix}/GET_ALL_GALLERY`,
  async ({ page, size }: PaginationInfo) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gallery?page=${page}&size=${size}`,
    );

    return response.data;
  },
);

export const getDetailGallery = createAsyncThunk(
  `${prefix}/GET_DETAIL_GALLERY`,
  async ({ category, roomId }: DetailArgType) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${category}/${roomId}`,
    );

    return response.data;
  },
);
