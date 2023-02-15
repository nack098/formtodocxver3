import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

const rootContainer = document.getElementById('root');

if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);
  root.render(<App />);
}
