import React, { useState, useEffect } from 'react';
import { Card, Button, Form, ListGroup, ButtonGroup } from 'react-bootstrap';

const MOOD_STORAGE_KEY = 'healthHubMoodEntries';
const MOOD_OPTIONS = ['Happy', 'Okay', 'Sad', 'Anxious', 'Angry'];

function MoodTracker() {
    const [moodEntries, setMoodEntries] = useState(() => {
        const savedEntries = localStorage.getItem(MOOD_STORAGE_KEY);
        try {
            const initialValue = JSON.parse(savedEntries);
            return Array.isArray(initialValue) ? initialValue : [];
        } catch (e) {
            return [];
        }
    });
    const [selectedMood, setSelectedMood] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moodEntries));
    }, [moodEntries]);

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const logMoodEntry = () => {
        if (!selectedMood) {
            console.warn("Please select a mood first.");
            return;
        }

        const newEntry = {
            id: Date.now(),
            mood: selectedMood,
            note: note,
            timestamp: new Date().toISOString(),
        };

        setMoodEntries(prevEntries => [newEntry, ...prevEntries]);
        setSelectedMood('');
        setNote('');
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title as="h3">How are you feeling today?</Card.Title>

                <div className="mb-3">
                    <ButtonGroup aria-label="Mood selection" className="mood-button-group">
                        {MOOD_OPTIONS.map(mood => (
                            <Button
                                key={mood}
                                variant={selectedMood === mood ? 'primary' : 'outline-secondary'}
                                onClick={() => handleMoodSelect(mood)}
                                className="mood-btn" 
                            >
                                {mood}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>


                <Form.Group className="mb-3" controlId="moodNote">
                    <Form.Label>Optional Note:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Any thoughts or details?"
                    />
                </Form.Group>


                <Button
                    variant="success"
                    onClick={logMoodEntry}
                    disabled={!selectedMood}
                >
                    Log Mood
                </Button>


                <div className="mt-4">
                    <h4>Recent Mood Entries:</h4>
                    {moodEntries.length === 0 ? (
                        <p className="text-muted">No moods logged yet.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {moodEntries.slice(0, 5).map(entry => (
                                <ListGroup.Item
                                    key={entry.id}
                                    className="d-flex justify-content-between align-items-start mood-entry-item"
                                >
                                    <div className="mood-entry-details">
                                        <strong>{entry.mood}</strong>
                                        {entry.note && <div className="text-muted ms-2 fst-italic"> - "{entry.note}"</div>}
                                    </div>
                                    <small className="text-muted mood-entry-timestamp">
                                        {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    {moodEntries.length > 5 && (
                        <div className="text-center mt-2">
                            <small className="text-muted">(Showing latest 5 entries)</small>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default MoodTracker;