import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store';

import { createMyList } from 'services/movieAPI';
import { resetStore } from 'utils/resetStore';

export const useGetMyList = () => {
  const navigator = useNavigate();
  const [myListId, setMyListId] = useState<number>();

  const getMyList = useCallback(async () => {
    try {
      const storedAccessToken = store.get('accessToken');
      if (!storedAccessToken) {
        resetStore();
        navigator('/login');
      }

      let tempMyListId = store.get('myListId');
      if (!tempMyListId) {
        const responseMylist = await createMyList(storedAccessToken);

        if (responseMylist.data.success) {
          store.set('myListId', responseMylist.data.id);
          tempMyListId = responseMylist.data.id;
        }
      }

      setMyListId(tempMyListId);
    } catch (error) {
      resetStore();
      navigator('/login');
    }
  }, [navigator]);

  useEffect(() => {
    getMyList();
  }, [getMyList]);

  return { myListId };
};
