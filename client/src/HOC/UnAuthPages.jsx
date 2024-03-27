import Login from '../Auth/Login';

function UnAuthPages({ children }) {
  const auth = false;

  if (!auth) {
    return <Login />;
  }

  return children;
}

export default UnAuthPages;
