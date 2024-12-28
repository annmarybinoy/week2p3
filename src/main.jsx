import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CombinedProvider } from './context'; // Import CombinedProvider
import './index.css'; // Import the CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CombinedProvider> {/* Wrap the app with CombinedProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CombinedProvider>
  </React.StrictMode>
);

