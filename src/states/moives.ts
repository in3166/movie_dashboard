import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieItem } from 'types/item';

import type { RootState } from '.';

interface ISelectedMovies {
  media_type: string;
  id: number;
}

interface IComments {
  id: number;
  type: string;
  comment: string;
}

export interface MoviesState {
  currentMovies: IMovieItem[];
  selectedMovies: ISelectedMovies[];
  comments: IComments[];
}

const INITIAL_STATE: MoviesState = { currentMovies: [], selectedMovies: [], comments: [] };

const moviesSlice = createSlice({
  name: 'movies',
  initialState: INITIAL_STATE,
  reducers: {
    setMovies: (state: MoviesState, action: PayloadAction<IMovieItem[]>) => {
      state.currentMovies = action.payload;
    },
    setSelectedMovies: (state: MoviesState, action: PayloadAction<ISelectedMovies[]>) => {
      state.selectedMovies = action.payload;
    },
    setComments: (state: MoviesState, action: PayloadAction<IComments[]>) => {
      state.comments = action.payload;
    },
  },
});

export const { setMovies, setSelectedMovies, setComments } = moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies = (state: RootState): IMovieItem[] => state.movies.currentMovies;
export const getSelectedMovies = (state: RootState): ISelectedMovies[] => state.movies.selectedMovies;
export const getComments = (state: RootState): IComments[] => state.movies.comments;
