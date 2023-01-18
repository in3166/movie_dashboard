export const resetStore = () => {
  store.remove('myListId');
  store.remove('accessToken');
  store.remove('sessionId');
  store.remove('email');
};
