import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DataView from './pages/data/dataview';
import Home from './pages/home/home';
import Sheets from './pages/sheets/sheets';
import './app.css';
import Data from './pages/sheets/data';

const App = () => {
  return (
    <BrowserRouter>
      <p className="absolute text-gray-500 left-[78%] top-[95%]">FormToDocxGui version: 0.3.0</p>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="sheets"
          element={<Sheets />}
        >
          <Route
            path=":id"
            element={<Data />}
          />
          <Route
            path=":id/data/:id"
            element={<DataView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
