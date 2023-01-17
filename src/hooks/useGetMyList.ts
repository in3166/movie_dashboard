import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store';

import { createMyList } from 'services/movieAPI';

export const useGetMyList = () => {
  const navigator = useNavigate();
  const [myListId, setMyListId] = useState<number>();

  const getMyList = useCallback(async () => {
    try {
      const storedAccessToken = store.get('accessToken');
      if (!storedAccessToken) {
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
      navigator('/login');
    }
  }, [navigator]);

  useEffect(() => {
    getMyList();
  }, [getMyList]);

  return { myListId };
};
