import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import store from 'store';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigator = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let session = store.get('sessionId');
    if (!session) {
      setAuthenticated(false);
    } else {
      session = JSON.parse(session);
      if (Date.now() > session.expire) {
        store.remove('sessionId');
        store.remove('accessToken');
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    }
    setLoading(false);
  }, [navigator]);

  if (!loading) return authenticated !== null && authenticated ? children : <Navigate to='/login' />;
  return null;
};
