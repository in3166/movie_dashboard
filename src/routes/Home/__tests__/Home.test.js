import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, renderWithProviders, screen, renderHook } from 'test-utils';
import { getAllMovies } from '../getAllMovies';
import * as axios from 'axios';
import Home from '../index';
import { MOVIE_API_URL } from 'constant';

const server = setupServer(
  rest.get(`${MOVIE_API_URL}/4/list/1?page=1&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'data' }));
  })
);

describe('home page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  jest.mock('axios', () => jest.fn(() => Promise.resolve('teresa teng')));
  test('validate function should pass on correct input', async () => {
    renderWithProviders(<Home />);
    const loadingSpinner = await screen.findByRole('contentinfo');
    expect(loadingSpinner).toBeInTheDocument();

    axios.get.mockImplementation(() => Promise.resolve());

    const homeHeader = screen.getByText('Movie 목록 조회');
    expect(homeHeader).toBeInTheDocument();
  });
});
