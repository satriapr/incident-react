import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './modules/Home/HomeView';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/:id" element={MovieDetail} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
