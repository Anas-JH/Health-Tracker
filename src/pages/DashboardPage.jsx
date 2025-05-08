import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WaterTracker from '../components/WaterTracker';
import CalorieTracker from '../components/CalorieTracker';
import StepsTracker from '../components/StepsTracker';

function DashboardPage() {
  const currentDate = new Date().toLocaleDateString(
    'en-GB',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <div>
      <div className="mb-4 p-3 bg-light rounded">
        <h2 className="h3">Your Health Dashboard</h2>
        <p className="lead mb-1">Overview of your daily progress.</p>
        <p className="text-muted small mb-0">{currentDate}</p>
      </div>

      <Row>
        <Col md={6} lg={4} className="mb-4">
          <WaterTracker />
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <CalorieTracker />
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <StepsTracker />
        </Col>
      </Row>

      <Card className="mt-3">
        <Card.Header as="h3" className="h5">Quick Actions</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={6} md={4} className="mb-2 d-grid">
              <Button as={Link} to="/wellbeing" variant="outline-primary" >
                Log Mood / Reminders
              </Button>
            </Col>
            <Col sm={6} md={4} className="mb-2 d-grid">
              <Button as={Link} to="/nutrition" variant="outline-success">
                Search Nutrition
              </Button>
            </Col>
            <Col sm={6} md={4} className="mb-2 d-grid">
              <Button as={Link} to="/exercises" variant="outline-info">
                Find Exercises
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DashboardPage;