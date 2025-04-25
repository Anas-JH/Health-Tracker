import React from 'react';
import { Card, ListGroup } from 'react-bootstrap'; 
import NewsFeed from '../components/NewsFeed';

function HomePage() {
  return (
    <Card>
      <Card.Body>
        <section className="mb-4"> 
          <Card.Title as="h1">Welcome to St Mary's Health Hub</Card.Title>
          <Card.Text className="lead">
            Your trusted resource for health and wellness information. We are dedicated to providing you with reliable and easy-to-understand resources to help you manage and improve your well-being.
          </Card.Text>
        </section>

        <section className="mb-4">
          <h2>Our Mission</h2>
          <Card.Text> 
            At St Mary's Health Hub, our mission is to empower individuals to take control of their health journey. We believe that access to reliable health information and practical tools is essential for everyone.
          </Card.Text>
        </section>

        <section className="mb-4">
          <h2>Explore Our Resources</h2>
          <Card.Text>
            We offer a range of resources to support your health and wellness goals:
          </Card.Text>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Health Condition Information:</strong> Learn about common health conditions, their symptoms, and general advice on management.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>BMI Calculator:</strong> Calculate your Body Mass Index (BMI) to understand your weight status.
            </ListGroup.Item>
          </ListGroup>
          <Card.Text>
            Stay tuned for more features and resources coming soon!
          </Card.Text>
        </section>

        <section className="mb-4">
          <NewsFeed />
        </section>

        <section> 
          <h2>Start Your Wellness Journey Today</h2>
          <Card.Text>
            Navigate through our site to explore helpful information and tools. Remember, taking small steps each day can lead to significant improvements in your overall health and quality of life.
          </Card.Text>
        </section>


      </Card.Body>
    </Card>
  );
}

export default HomePage;