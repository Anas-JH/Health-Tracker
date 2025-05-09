import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

function BMICalculator() {
  const [input, setInput] = useState({ weight: '', height: '' });
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  const calculateBmi = (event) => {
    event.preventDefault();
    setError('');
    setBmi(null);
    setBmiCategory('');

    const weightKg = parseFloat(input.weight);
    const heightCm = parseFloat(input.height);

    if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      return;
    }

    const heightM = heightCm / 100;
    const bmiValue = weightKg / (heightM * heightM);
    const formattedBmi = bmiValue.toFixed(2);
    setBmi(formattedBmi);

    const category = bmiValue < 18.5 ? 'Underweight' :
      bmiValue < 25 ? 'Normal weight' :
        bmiValue < 30 ? 'Overweight' :
          'Obesity';
    setBmiCategory(category);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h1">BMI Calculator</Card.Title>
        <Card.Text>
          Enter your weight and height below to calculate your Body Mass Index.
        </Card.Text>

        <Form onSubmit={calculateBmi}>
          <Form.Group as={Row} className="mb-3" controlId="weightInput">
            <Form.Label column sm={3}>
              Weight (kg):
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="weight"
                value={input.weight}
                onChange={handleChange}
                placeholder="e.g., 70"
                step="0.1"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="heightInput">
            <Form.Label column sm={3}>
              Height (cm):
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="height"
                value={input.height}
                onChange={handleChange}
                placeholder="e.g., 175"
                required
              />
            </Col>
          </Form.Group>

          <Row>
            <Col sm={{ span: 9, offset: 3 }}>
              <Button variant="primary" type="submit">
                Calculate BMI
              </Button>
            </Col>
          </Row>
        </Form>

        {bmi !== null && (
          <Alert variant="success" className="mt-4">
            <Alert.Heading as="h2">Your Results</Alert.Heading>
            <p>Your BMI is: <strong>{bmi}</strong></p>
            <p className="mb-0">
              This is considered: <strong>{bmiCategory}</strong>
            </p>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default BMICalculator; 