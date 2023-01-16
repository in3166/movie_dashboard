import { useState, useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import store from 'store';

import { MOVIE_API_URL } from 'features';
import { getAccessToken } from 'services/movies';
import { useAppDispatch } from './useAppDispatch';

export const useInitializeUser = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [myListId, setMyListId] = useState<number>();

  const getMyList = useCallback(
    async (requestToken: string) => {
      try {
        let storedAccessToken = store.get('accessToken');
        if (!storedAccessToken) {
          const accessTokenResponse = await getAccessToken(requestToken);
          if (accessTokenResponse.data.success) {
            const tempAccessToken = accessTokenResponse.data.access_token;
            storedAccessToken = tempAccessToken;
            store.set('accessToken', tempAccessToken);
            setAccessToken(tempAccessToken);
          }
        }

        let tempMyListId = store.get('myListId');
        if (!tempMyListId) {
          const responseMylist = await axios.post(
            `${MOVIE_API_URL}/4/list`,
            {
              name: `My List-${new Date().getTime()}`,
              iso_639_1: 'en',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedAccessToken}`,
              },
            }
          );

          if (responseMylist.data.success) {
            store.set('myListId', responseMylist.data.id);
            tempMyListId = responseMylist.data.id;
          }
        }

        setMyListId(tempMyListId);
      } catch (error) {
        navigator('/login');
      }
    },
    [navigator]
  );

  useLayoutEffect(() => {
    const requestToken = store.get('requestToken');
    if (!requestToken) navigator('/login');
    getMyList(requestToken);
  }, [dispatch, getMyList, navigator]);

  return { accessToken, myListId };
};
