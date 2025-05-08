import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import NewsFeed from '../components/NewsFeed';

function HomePage() {
  return (
    <Card border="light">
      <Card.Body>
        <section className="mb-4 text-center bg-light p-4 rounded">
          <h1 className="display-5">Welcome to St Mary's Health Hub</h1>
          <p className="lead mt-3">
            Your central resource for managing well-being, tracking progress, and finding reliable health information.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Our Mission</h2>
          <Card.Text className="text-center col-md-8 mx-auto">
            At St Mary's Health Hub, our mission is to empower you to take control of your health journey through accessible information and practical tools.
          </Card.Text>
        </section>

        <section className="mb-5">
          <h2 className="text-center mb-4">Explore Our Features</h2>
          <ListGroup variant="flush">
            <ListGroup.Item action href="/dashboard" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>Dashboard:</strong> Track your daily water intake, calories consumed, and steps walked.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Manage Daily Goals
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item action href="/wellbeing" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>Well-being & Reminders:</strong> Log your daily mood and set helpful medication reminders.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Support & Schedule
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item action href="/conditions" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>Health Condition Info:</strong> Learn about common conditions, symptoms, and general advice.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Information Resource
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item action href="/bmi-calculator" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>BMI Calculator:</strong> Calculate your Body Mass Index to understand your weight status.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Check Your BMI
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item action href="/nutrition" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>Nutrition Search:</strong> Find nutritional information for various food items.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Food Database Search
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item action href="/exercises" className="py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <strong>Exercise Finder:</strong> Search for exercises based on muscle groups.
                </Col>
                <Col md={4} className="text-md-end text-muted small">
                  Workout Ideas
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Latest Health News</h2>
          <NewsFeed />
        </section>

        <section className="text-center">
          <h2>Start Your Wellness Journey Today</h2>
          <Card.Text>
            Navigate using the menu above to explore these tools and information. Small daily steps lead to lasting well-being.
          </Card.Text>
        </section>

      </Card.Body>
    </Card>
  );
}

export default HomePage;