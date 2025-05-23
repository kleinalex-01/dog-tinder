import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './Components/Layout';
import Profile from './Components/Profile';
import Messages from './Components/Messages';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<App/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/chat" element={<Messages/>}/>
         </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);