import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  images: [],
  totalImages: 0,
  error: '',
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getImagesRequest: state => {
      state.isLoading = true;
      state.totalImages = 0;
    },
    getImagesSuccess: (state, action) => {
      state.isLoading = false;
      state.images = action.payload.hits;
      state.totalImages = action.payload.totalHits;
      state.error = '';
    },
    getImagesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMoreImagesRequest: state => {
      state.isLoading = true;
      state.totalImages = 0;
    },
    getMoreImagesSuccess: (state, action) => {
      state.isLoading = false;
      state.images = [...state.images, ...action.payload.hits];
      state.totalImages = action.payload.totalHits;
      state.error = '';
    },
    getMoreImagesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getImagesRequest,
  getImagesSuccess,
  getImagesError,
  getMoreImagesRequest,
  getMoreImagesSuccess,
  getMoreImagesError,
} = imagesSlice.actions;

export default imagesSlice.reducer;
