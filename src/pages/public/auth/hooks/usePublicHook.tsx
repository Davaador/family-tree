import { AuthAction } from 'context/actions/auth.action';
import { AuthState } from 'context/entities/auth.model';
import { redirect } from 'react-router-dom';

import { LoginSavedData } from '../auth.model';

const redirectIfLoggedIn = (store: any) => {
  const state: AuthState & AuthAction = store.getState();
  if (state.authenticated) return redirect('/');
  return false;
};

function loginLoader(): LoginSavedData {
  return {
    rememberMe: true,
    savedPhoneNumber: '89330510',
  };
}

export { redirectIfLoggedIn, loginLoader };
