import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MoodTracker from '../components/MoodTracker';

function WellbeingPage() {
    return (
        <div>
            <h1 className="mb-4">Mental Well-being</h1>
            <p className="lead mb-4">Tools and resources to support your mental health journey.</p>
            <Row>
                <Col md={8} lg={6}>
                    <MoodTracker />
                </Col>
            </Row>
        </div>
    );
}

export default WellbeingPage;