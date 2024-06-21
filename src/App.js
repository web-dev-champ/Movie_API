import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import MovieDetail from './Components/MovieDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
