import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

/* 
  initialize root element to null 
  reassign root element to document root element if window is not undefined
  then check that the root element is correctly selected and create the root
*/
let rootElement: HTMLElement | null = null;
if (typeof window !== undefined) {
  rootElement = document.getElementById('root');
}

if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
