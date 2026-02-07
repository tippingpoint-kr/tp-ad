import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AdvertisingMedia from './pages/AdvertisingMedia';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminChannels from './pages/admin/AdminChannels';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminDocuments from './pages/admin/AdminDocuments';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
