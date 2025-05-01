import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup, ProgressBar } from 'react-bootstrap';

const CALORIE_STORAGE_KEY = 'healthHubCalorieIntake';
const DAILY_CALORIE_GOAL = 2000; // Example goal

function CalorieTracker() {
  const [calories, setCalories] = useState(() => {
    const saved = localStorage.getItem(CALORIE_STORAGE_KEY);
    const initialValue = JSON.parse(saved);
    return typeof initialValue === 'number' && initialValue >= 0 ? initialValue : 0;
  });
  const [caloriesToAdd, setCaloriesToAdd] = useState('');

  useEffect(() => {
    localStorage.setItem(CALORIE_STORAGE_KEY, JSON.stringify(calories));
  }, [calories]);

  const handleInputChange = (event) => {
    setCaloriesToAdd(event.target.value);
  };

  const addCalories = (event) => {
    event.preventDefault(); // Prevent form submission reload
    const amount = parseInt(caloriesToAdd, 10);
    if (!isNaN(amount) && amount > 0) {
      setCalories(prevCalories => prevCalories + amount);
      setCaloriesToAdd(''); // Clear input field after adding
    } else {
      console.warn("Please enter a valid positive number for calories.");
    }
  };

  const resetCalories = () => {
    setCalories(0);
    setCaloriesToAdd('');
  };

  // Calculate progress
  const progress = Math.min(100, (calories / DAILY_CALORIE_GOAL) * 100);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Calories Consumed</Card.Title>
        <Card.Text>
          Goal: {DAILY_CALORIE_GOAL} kcal per day.
        </Card.Text>

        <ProgressBar
            now={progress}
            label={`${calories} / ${DAILY_CALORIE_GOAL} kcal`}
            variant={progress >= 100 ? 'warning' : 'success'}
            className="mb-3"
        />

        <Form onSubmit={addCalories}>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              placeholder="Add Calories"
              value={caloriesToAdd}
              onChange={handleInputChange}
              min="1" // Basic HTML validation
            />
            <Button variant="primary" type="submit" disabled={!caloriesToAdd}>
              Add
            </Button>
          </InputGroup>
        </Form>

        <div className="text-end">
            <Button variant="outline-danger" size="sm" onClick={resetCalories}>Reset</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default CalorieTracker;