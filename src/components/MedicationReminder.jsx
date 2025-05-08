import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form, ListGroup, Row, Col, Alert } from 'react-bootstrap';

const REMINDER_STORAGE_KEY = 'healthHubMedicationReminders';

function MedicationReminder() {
    const [reminders, setReminders] = useState(() => {
        const savedReminders = localStorage.getItem(REMINDER_STORAGE_KEY);
        try {
            const initialValue = JSON.parse(savedReminders);
            return Array.isArray(initialValue)
                ? initialValue.map(r => ({
                    ...r,
                    isDue: false,
                    lastCheckedDate: null //to track when we last checked its due status for today
                }))
                : [];
        } catch (e) {
            return [];
        }
    });

    const [medName, setMedName] = useState('');
    const [dosage, setDosage] = useState('');
    const [reminderTime, setReminderTime] = useState('');


    useEffect(() => {
        localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(reminders.map(({ isDue, lastCheckedDate, ...rest }) => rest)));
    }, [reminders]);


    const checkDueReminders = useCallback(() => {
        const now = new Date();
        const todayDateString = now.toLocaleDateString();
        const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        setReminders(prevReminders =>
            prevReminders.map(r => {
                let dueStatus = r.isDue;

                if (r.lastCheckedDate !== todayDateString) {
                    dueStatus = false;
                }

                if (r.time <= currentTimeString && !dueStatus && r.lastCheckedDate !== todayDateString) {
                    console.log(`Reminder due (or past due today): ${r.name} at ${r.time}`);
                    dueStatus = true;
                }

                return { ...r, isDue: dueStatus, lastCheckedDate: todayDateString };
            })
        );
    }, []);

    useEffect(() => {
        checkDueReminders();
        const intervalId = setInterval(checkDueReminders, 30000);
        return () => clearInterval(intervalId);
    }, [checkDueReminders]);


    const handleAddReminder = (event) => {
        event.preventDefault();
        if (!medName.trim() || !reminderTime) {
            alert("Please enter medication name and reminder time.");
            return;
        }

        const newReminder = {
            id: Date.now(),
            name: medName.trim(),
            dosage: dosage.trim(),
            time: reminderTime,
            isDue: false,
            lastCheckedDate: null,
        };

        setReminders(prevReminders =>
            [...prevReminders, newReminder].sort((a, b) => a.time.localeCompare(b.time))
        );
        setMedName('');
        setDosage('');
        setReminderTime('');
    };

    const handleRemoveReminder = (idToRemove) => {
        setReminders(prevReminders => prevReminders.filter(r => r.id !== idToRemove));
    };

    const handleMarkAsTaken = (idToUpdate) => {
        setReminders(prevReminders =>
            prevReminders.map(r =>
                r.id === idToUpdate ? { ...r, isDue: false } : r
            )
        );
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title as="h3">Medication Reminders</Card.Title>
                <Form onSubmit={handleAddReminder}>
                    <Row className="g-2 mb-3 align-items-end">
                        <Col md>
                            <Form.Group controlId="medName">
                                <Form.Label>Medication Name</Form.Label>
                                <Form.Control type="text" value={medName} onChange={(e) => setMedName(e.target.value)} placeholder="e.g., Paracetamol" required />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group controlId="dosage">
                                <Form.Label>Dosage (Optional)</Form.Label>
                                <Form.Control type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g., 500mg" />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group controlId="reminderTime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md="auto">
                            <Button variant="primary" type="submit" className="w-100">Add Reminder</Button>
                        </Col>
                    </Row>
                </Form>

                <h4 className="mt-4">Scheduled Reminders:</h4>
                {reminders.length === 0 ? (
                    <Alert variant="info" className="mt-2">No medication reminders set yet.</Alert>
                ) : (
                    <ListGroup variant="flush">
                        {reminders.map(reminder => (
                            <ListGroup.Item
                                key={reminder.id}
                                variant={reminder.isDue ? 'danger' : ''}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{reminder.name}</strong> {reminder.dosage && `(${reminder.dosage})`}
                                    <br />
                                    <small className="text-muted">Time: {reminder.time}</small>
                                    {reminder.isDue && <span className="badge bg-danger ms-2 pulse-danger">Due!</span>}
                                </div>
                                <div>
                                    {reminder.isDue && (
                                        <Button variant="success" size="sm" onClick={() => handleMarkAsTaken(reminder.id)} className="me-2">
                                            Taken
                                        </Button>
                                    )}
                                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveReminder(reminder.id)}>
                                        Remove
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}

export default MedicationReminder;