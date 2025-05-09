import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HealthConditions from './pages/HealthConditions';
import BMICalculator from './pages/BMICalculator';
import NutritionPage from './pages/NutritionPage';
import ExercisesPage from './pages/ExercisesPage';
import DashboardPage from './pages/DashboardPage';
import WellbeingPage from './pages/WellbeingPage';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaTachometerAlt, FaSmileBeam, FaNotesMedical, FaCalculator, FaAppleAlt, FaDumbbell } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><FaNotesMedical className="me-2" />St Mary's Health</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link><FaHome className="me-2" />Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dashboard">
                <Nav.Link><FaTachometerAlt className="me-2" />Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/wellbeing">
                <Nav.Link><FaSmileBeam className="me-2" />Well-being</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/conditions">
                <Nav.Link><FaNotesMedical className="me-2" />Health Conditions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/bmi-calculator">
                <Nav.Link><FaCalculator className="me-2" />BMI Calculator</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/nutrition">
                <Nav.Link><FaAppleAlt className="me-2" />Nutrition Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/exercises">
                <Nav.Link><FaDumbbell className="me-2" />Exercise Finder</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conditions" element={<HealthConditions />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wellbeing" element={<WellbeingPage />} />
        </Routes>
      </Container>

      <footer className="mt-auto py-3 bg-light">
        <Container>
          <p className="text-center text-muted mb-0">
            © {new Date().getFullYear()} St Mary's Health Hub
          </p>
        </Container>
      </footer>
    </div>
  );
}
export default App;