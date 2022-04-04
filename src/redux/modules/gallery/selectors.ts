import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectGallery = (state: RootState) => state.gallery;

export const gallerySelector = createSelector(selectGallery, state => state);
