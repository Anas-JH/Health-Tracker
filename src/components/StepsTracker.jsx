import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup, ProgressBar } from 'react-bootstrap';
import { FaShoePrints } from 'react-icons/fa';

const STEPS_STORAGE_KEY = 'healthHubStepsWalked';
const DAILY_STEPS_GOAL = 10000; // Example goal

function StepsTracker() {
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem(STEPS_STORAGE_KEY);
    const initialValue = JSON.parse(saved);
    return typeof initialValue === 'number' && initialValue >= 0 ? initialValue : 0;
  });
  const [stepsToAdd, setStepsToAdd] = useState('');

  useEffect(() => {
    localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(steps));
  }, [steps]);

  const handleInputChange = (event) => {
    setStepsToAdd(event.target.value);
  };

  const addSteps = (event) => {
    event.preventDefault();
    const amount = parseInt(stepsToAdd, 10);
    if (!isNaN(amount) && amount > 0) {
      setSteps(prevSteps => prevSteps + amount);
      setStepsToAdd('');
    } else {
      console.warn("Please enter a valid positive number for steps.");
    }
  };

  const resetSteps = () => {
    setSteps(0);
    setStepsToAdd('');
  };

  // Calculate progress
  const progress = Math.min(100, (steps / DAILY_STEPS_GOAL) * 100);

  return (
    <Card>
      <Card.Body>
        <FaShoePrints className="me-2 text-info" />
        <Card.Title>Steps Walked</Card.Title>
        <Card.Text>
          Goal: {DAILY_STEPS_GOAL} steps per day.
        </Card.Text>

        <ProgressBar
          now={progress}
          label={`${steps} / ${DAILY_STEPS_GOAL} steps`}
          variant={progress >= 100 ? 'success' : 'info'}
          className="mb-3"
        />

        <Form onSubmit={addSteps}>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              placeholder="Add Steps"
              value={stepsToAdd}
              onChange={handleInputChange}
              min="1"
            />
            <Button variant="primary" type="submit" disabled={!stepsToAdd}>
              Add
            </Button>
          </InputGroup>
        </Form>

        <div className="text-end">
          <Button variant="outline-danger" size="sm" onClick={resetSteps}>Reset</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default StepsTracker;