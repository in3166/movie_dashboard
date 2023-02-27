import { rest } from 'msw';
import { MOVIE_API_URL } from 'constant';

export const handlers = [
  rest.post(`${MOVIE_API_URL}/4/auth/request_token`, (req, res, ctx) => {
    return res(ctx.json({ request_token: 'requestkertoken' }));
  }),
  rest.post(`${MOVIE_API_URL}/4/auth/access_token`, (req, res, ctx) => {
    return res(ctx.json({ accss_token: 'accesstokensdkfoe' }));
  }),
  rest.post(`${MOVIE_API_URL}/3/authentication/session/convert/4`, (req, res, ctx) => {
    return res(ctx.json({ session_id: 'sessioniddf' }));
  }),
];
