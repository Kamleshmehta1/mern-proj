import React from 'react';
import Routes from './routes/Routes';
import { AuthProvider } from './Auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
