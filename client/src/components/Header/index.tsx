import * as React from 'react';
import { Button } from 'antd';
import { AuthContext } from '../../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import * as styles from './styles.scss';

export default function Header() {
  const { isLoggedIn, logout } = React.useContext(AuthContext);
  const history = useHistory();
  return (
    <div className={styles.header}>
      <h1>Not Another TODO List!?!</h1>
      <>
        {isLoggedIn && isLoggedIn() && (
          <Button
            size="small"
            onClick={() => {
              if (logout) {
                logout();
                history.push('/login');
              }
            }}
          >
            Logout
          </Button>
        )}
      </>
    </div>
  );
}
