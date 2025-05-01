import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import WaterTracker from '../components/WaterTracker';
import CalorieTracker from '../components/CalorieTracker';
import StepsTracker from '../components/StepsTracker';

function DashboardPage() {
  return (
    <div>
      <h1 className="mb-4">Your Health Dashboard</h1>
      <Row>
        {/* Water Tracker Column */}
        <Col md={6} lg={4} className="mb-4">
           <WaterTracker />
        </Col>

        {/* Calorie Tracker Column */}
        <Col md={6} lg={4} className="mb-4">
           <CalorieTracker />
        </Col>

        {/* Steps Tracker Column */}
        <Col md={6} lg={4} className="mb-4">
           <StepsTracker />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;