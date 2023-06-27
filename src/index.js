import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import NewsList from './components/NewsList';
import HeaderMenu from './components/HeaderMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeaderMenu />
    <NewsList />
  </React.StrictMode>
);

