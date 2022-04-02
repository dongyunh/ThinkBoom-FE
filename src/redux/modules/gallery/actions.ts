import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GalleryState } from './types';
import axios from 'axios';

const prefix = 'gallery';

export const getAllGallery = createAsyncThunk(`${prefix}/GET_ALL_GALLERY`, async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);

  return response.data;
});
