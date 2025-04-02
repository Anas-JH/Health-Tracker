import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HealthConditions from './pages/HealthConditions'; // Corrected spelling
import BMICalculator from './pages/BMICalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/conditions">Health Conditions</Link>
          </li>
          <li>
            <Link to="/bmi-calculator">BMI Calculator</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conditions" element={<HealthConditions />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
        </Routes>
      </main>
    </div>
    );
}
export default App;