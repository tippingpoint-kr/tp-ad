import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdvertisingMedia from './pages/AdvertisingMedia';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advertising-media" element={<AdvertisingMedia />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
