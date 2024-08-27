import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import About from '../About';
import Contact from '../Contact';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home Release Testing</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
