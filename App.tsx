import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdvertisingMedia from './pages/AdvertisingMedia';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminChannels from './pages/admin/AdminChannels';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminDocuments from './pages/admin/AdminDocuments';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advertising-media" element={<AdvertisingMedia />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="channels" element={<AdminChannels />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="documents" element={<AdminDocuments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
