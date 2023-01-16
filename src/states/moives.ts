import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieItem } from 'types/item';

import type { RootState } from '.';

export interface MoviesState {
  currentMovies: IMovieItem[];
  selectedMovies: IMovieItem[];
}

const INITIAL_STATE: MoviesState = { currentMovies: [], selectedMovies: [] };

const moviesSlice = createSlice({
  name: 'movies',
  initialState: INITIAL_STATE,
  reducers: {
    setMovies: (state: MoviesState, action: PayloadAction<IMovieItem[]>) => {
      state.currentMovies = action.payload;
    },
    setSelectedMovies: (state: MoviesState, action: PayloadAction<IMovieItem[]>) => {
      state.selectedMovies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies = (state: RootState): IMovieItem[] => state.movies.currentMovies;
export const getSelectedMovies = (state: RootState): IMovieItem[] => state.movies.selectedMovies;
