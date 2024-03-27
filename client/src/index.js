import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import NoTiStackProvider from './HOC/NoTiStackProvider';
import ThemeProvider from './HOC/AuthProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <NoTiStackProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </NoTiStackProvider>
  </ReduxProvider>
);
