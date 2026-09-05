import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, ToastProvider } from './lib';
import { DemoApp } from './demo/DemoApp';
import './demo/demo.css';
import './demo/showcase.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><ThemeProvider><ToastProvider><DemoApp/></ToastProvider></ThemeProvider></React.StrictMode>
);
