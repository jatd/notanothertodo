import * as React from 'react';

type ContextProps = {
  isLoggedIn: () => void | string;
  login: (loginProps: LoginProps) => any;
  logout: () => void;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

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

  const isLoggedIn = () => authState.token;

  const login = (loginProps: LoginProps) => {
    console.log('logging in');
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
