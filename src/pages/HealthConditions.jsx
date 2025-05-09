import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const healthConditionsData = [
  {
    title: "Common Cold",
    description: "A viral infection of the upper respiratory tract, primarily affecting the nose and throat.",
    advice: [
      "Rest and get plenty of sleep.",
      "Drink plenty of fluids to stay hydrated.",
      "Use over-the-counter pain relievers for fever and aches.",
      "Consider saline nasal drops to relieve congestion."
    ]
  },
  {
    title: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness.",
    advice: [
      "Rest is crucial to allow your body to recover.",
      "Drink lots of clear fluids like water, broth, and electrolyte drinks.",
      "Antiviral medications can be prescribed by a doctor, especially for high-risk individuals.",
      "Stay home from work or school to prevent spreading the virus."
    ]
  },
  {
    title: "Headache",
    description: "Pain in the head that can range from mild to severe and occur on one or both sides of the head.",
    advice: [
      "Over-the-counter pain relievers like ibuprofen or acetaminophen can be effective.",
      "Rest in a quiet, dark room.",
      "Apply a cold or warm compress to your forehead or neck.",
      "Ensure you are adequately hydrated."
    ]
  },
];


function HealthConditions() {
  return (
    <div>
      <h1 className="mb-4">Common Health Conditions</h1>
      <p className="lead mb-4">
        Below is a list of common health conditions with descriptions and general advice:
      </p>

      {healthConditionsData.map((condition, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title as="h2">{condition.title}</Card.Title>
            <Card.Text>{condition.description}</Card.Text>
            {condition.advice && condition.advice.length > 0 && (
              <>
                <h3 className="h5 mt-3">General Advice:</h3>
                <ListGroup variant="flush">
                  {condition.advice.map((adviceItem, adviceIndex) => (
                    <ListGroup.Item key={adviceIndex}>
                      {adviceItem}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HealthConditions; 