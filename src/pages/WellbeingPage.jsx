import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MoodTracker from '../components/MoodTracker';
import MedicationReminder from '../components/MedicationReminder';

function WellbeingPage() {
    return (
        <div>
            <h1 className="mb-4">Mental Well-being & Reminders</h1>
            <p className="lead mb-4">Tools and resources to support your mental health and daily schedule.</p>
            <Row>
                <Col lg={6} className="mb-4">
                    <MoodTracker />
                </Col>
                <Col lg={6} className="mb-4">
                    <MedicationReminder />
                </Col>
            </Row>
        </div>
    );
}

export default WellbeingPage;