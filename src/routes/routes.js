// src/routes/routes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
// Importe outros componentes conforme necessário

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
