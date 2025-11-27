import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecordCough from './pages/RecordCough';
import ViewRecordings from './pages/ViewRecordings';
import Statistics from './pages/Statistics';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/record" element={<RecordCough />} />
            <Route path="/recordings" element={<ViewRecordings />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;