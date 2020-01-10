import * as React from 'react';

export const AuthContext = React.createContext<Partial<any>>({});

interface User {
  id: number;
  email: string;
}

export interface LoginProps {
  user?: User;
  token?: string;
}

export default function AuthProvider(props: any) {
  const [authState, setAuthState] = React.useState<LoginProps>({});

  const isLoggedIn = () => sessionStorage.getItem('token') || '';

  const login = (loginProps: LoginProps) => {
    sessionStorage.setItem('user', JSON.stringify(loginProps.user));
    sessionStorage.setItem('token', loginProps.token || '');
    setAuthState({ ...authState, ...loginProps });
  };

  const logout = () => sessionStorage.clear();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user: authState.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
