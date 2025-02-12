// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import About from './pages/About';
// import ComingSoon from './pages/ComingSoon';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/about" element={<About />} />
//           <Route path='/coming-soon' element={<ComingSoon />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/coming-soon" element={<ComingSoon />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
