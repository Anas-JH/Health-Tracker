import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup, ProgressBar } from 'react-bootstrap';
import { FaTint } from 'react-icons/fa';


const LOCAL_STORAGE_KEY = 'healthHubWaterIntake';
const DAILY_GOAL = 8;

function WaterTracker() {
  const [waterCount, setWaterCount] = useState(() => {
    const savedCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialValue = JSON.parse(savedCount);
    return typeof initialValue === 'number' && initialValue >= 0 ? initialValue : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(waterCount));
  }, [waterCount]);

  const addWater = () => {
    setWaterCount(prevCount => prevCount + 1);
  };

  const removeWater = () => {
    // Prevent going below zero
    setWaterCount(prevCount => Math.max(0, prevCount - 1));
  };

  const resetWater = () => {
    setWaterCount(0);
  };

  // Calculate progress for the progress bar
  const progress = Math.min(100, (waterCount / DAILY_GOAL) * 100);


  return (
    <Card>
      <Card.Body>
        <FaTint className="me-2 text-info" />
        <Card.Title>Daily Water Intake</Card.Title>
        <Card.Text>
          Goal: {DAILY_GOAL} glasses/units per day.
        </Card.Text>

        <ProgressBar
          now={progress}
          label={`${waterCount} / ${DAILY_GOAL}`}
          variant={progress >= 100 ? 'success' : 'info'}
          className="mb-3"
        />

        <div className="d-flex justify-content-between align-items-center">
          <ButtonGroup aria-label="Water controls">
            <Button variant="outline-secondary" onClick={removeWater} disabled={waterCount <= 0}>-</Button>
            <Button variant="primary" onClick={addWater}>+ Add Glass</Button>
          </ButtonGroup>
          <Button variant="outline-danger" size="sm" onClick={resetWater}>Reset</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default WaterTracker;