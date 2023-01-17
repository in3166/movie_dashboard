import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import type { AppStore, RootState } from 'states';
import moviesReducer from 'states/moives';
import userReducer from 'states/user';
import ErrorFallback from 'components/Layout/ErrorFallback';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: { movies: moviesReducer, user: userReducer },
      devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
  };

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
