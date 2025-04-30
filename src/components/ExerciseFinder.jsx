// src/components/ExerciseFinder.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Spinner, Alert, Row, Col, Accordion } from 'react-bootstrap'; // Added Accordion

// List of common muscle groups for the dropdown
const muscleGroups = [
    'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest',
    'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back',
    'neck', 'quadriceps', 'traps', 'triceps'
];

function ExerciseFinder() {
  // --- State ---
  const [selectedMuscle, setSelectedMuscle] = useState(''); // Store selected muscle
  const [exercises, setExercises] = useState([]); // Store results array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Key ---
  const apiKey = import.meta.env.VITE_API_NINJAS_KEY;

  // --- Handle Muscle Selection Change ---
  const handleMuscleChange = (event) => {
    setSelectedMuscle(event.target.value);
  };

  // --- Handle Form Submission (Fetch Exercises) ---
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!selectedMuscle) {
      setError("Please select a muscle group.");
      setExercises([]);
      return;
    }

    setLoading(true);
    setError(null);
    setExercises([]); // Clear previous results

    if (!apiKey) {
        setError("API key for API Ninjas is missing.");
        setLoading(false);
        return;
    }

    // API Ninjas Exercises API Endpoint
    const apiUrl = `https://api.api-ninjas.com/v1/exercises`;
    const params = {
        muscle: selectedMuscle // Pass selected muscle as parameter
        // You could add other parameters here like 'type' or 'difficulty' later
    };
    const headers = {
        'X-Api-Key': apiKey
    };

    try {
        const response = await axios.get(apiUrl, { params, headers });
        console.log("API Ninjas Exercises Response:", response.data); // Inspect structure

        if (response.data && response.data.length > 0) {
            setExercises(response.data); // Store the array of exercises
        } else {
            setError(`No exercises found for muscle group: ${selectedMuscle}.`);
        }

    } catch (err) {
        console.error("Error fetching exercises:", err);
        const message = err.response?.data?.message || err.message || "An error occurred.";
        setError(message);
    } finally {
        setLoading(false);
    }
  };

  // --- Render Logic ---
  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2">Exercise Finder</Card.Title>
        <Form onSubmit={handleSearch}>
          <Row className="align-items-end"> {/* Align items to bottom for better button alignment */}
            <Col xs={12} md={8} lg={9} className="mb-2 mb-md-0">
              <Form.Group controlId="muscleSelect">
                <Form.Label>Select Muscle Group:</Form.Label>
                <Form.Select
                  aria-label="Select muscle group"
                  value={selectedMuscle}
                  onChange={handleMuscleChange}
                  required
                >
                  <option value="">-- Select Muscle --</option>
                  {muscleGroups.map(muscle => (
                    <option key={muscle} value={muscle}>
                      {/* Simple capitalization for display */}
                      {muscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Find Exercises'}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="danger" className="mt-4">{error}</Alert>
        )}

        {/* Results Display using Accordion */}
        {exercises.length > 0 && !loading && !error && (
          <div className="mt-4">
            <h3>Exercises for: {selectedMuscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            {/* Accordion makes list collapsible */}
            <Accordion defaultActiveKey="0" alwaysOpen>
              {exercises.map((ex, index) => (
                <Accordion.Item eventKey={String(index)} key={index}>
                  <Accordion.Header>{ex.name || 'Unnamed Exercise'}</Accordion.Header>
                  <Accordion.Body>
                    <p><strong>Muscle:</strong> {ex.muscle?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}</p>
                    <p><strong>Equipment:</strong> {ex.equipment?.replace(/_/g, ' ') || 'N/A'}</p>
                    <p><strong>Difficulty:</strong> {ex.difficulty?.replace(/_/g, ' ') || 'N/A'}</p>
                    <p><strong>Instructions:</strong></p>
                    {/* Split instructions by '. ' for better readability, handle potential missing instructions */}
                    <ol>
                      {ex.instructions?.split('. ').filter(instr => instr.trim() !== '').map((instr, i) => (
                        <li key={i}>{instr.trim()}{instr.trim().endsWith('.') ? '' : '.'}</li>
                      )) || <li>No instructions provided.</li>}
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExerciseFinder;