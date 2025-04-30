import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HealthConditions from './pages/HealthConditions'; 
import BMICalculator from './pages/BMICalculator';
import NutritionPage from './pages/NutritionPage';
import ExercisesPage from './pages/ExercisesPage';
import { Container, Navbar, Nav } from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap'; 
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top"> 
        <Container> 
          <LinkContainer to="/">
            <Navbar.Brand>St Mary's Health</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/conditions">
                <Nav.Link>Health Conditions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/bmi-calculator">
                <Nav.Link>BMI Calculator</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/nutrition">
                <Nav.Link>Nutrition Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/exercises">
                <Nav.Link>Exercise Finder</Nav.Link>
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
        </Routes>
      </Container>

      {/*Footer*/}
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