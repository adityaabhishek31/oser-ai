import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/oser-ai" element={<Homepage />} />
          <Route path="/oser-ai/about" element={<About />} />
          <Route path='/oser-ai/coming-soon' element={<ComingSoon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
