// src/components/NutritionSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';

function NutritionSearch() {
  const [query, setQuery] = useState('');
  // Nutritionix usually returns data within a 'foods' array
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Credentials ---
  const appId = import.meta.env.VITE_NUTRITIONIX_APP_ID;
  const apiKey = import.meta.env.VITE_NUTRITIONIX_API_KEY;

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a food item or description.");
      setFoods([]); // Clear previous results
      return;
    }

    setLoading(true);
    setError(null);
    setFoods([]); // Clear previous results

    if (!appId || !apiKey) {
        setError("API credentials for Nutritionix are missing. Check .env configuration.");
        setLoading(false);
        return;
    }

    // Nutritionix Natural Language Endpoint (v2)
    const apiUrl = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    // Request Headers
    const headers = {
        'Content-Type': 'application/json',
        'x-app-id': appId,
        'x-app-key': apiKey
    };

    // Request Body
    const data = {
        query: query // Send the search query in the request body
        // You can add timezone if needed: "timezone": "Europe/London"
    };

    try {
        // Use POST request with Axios, passing url, data, and config with headers
        const response = await axios.post(apiUrl, data, { headers });
        console.log("Nutritionix Response:", response.data); // IMPORTANT: Inspect structure

        // Nutritionix returns results in a 'foods' array
        if (response.data?.foods && response.data.foods.length > 0) {
            setFoods(response.data.foods); // Store the array of foods found
        } else {
            setError(`No nutritional information found for "${query}" on Nutritionix.`);
        }

    } catch (err) {
        console.error("Error fetching nutritional data:", err);
        // Nutritionix errors might be in err.response.data.message
        const message = err.response?.data?.message || err.message || "An error occurred while fetching data.";
        setError(message);
    } finally {
        setLoading(false);
    }
  };

   // Helper to format nutrient value
   const formatNutrient = (value, unit = 'g') => {
    return value !== null && value !== undefined ? `${parseFloat(value).toFixed(1)}${unit}` : 'N/A';
   }

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2">Search Nutritional Info (Nutritionix)</Card.Title>
        {/* --- Form is the same --- */}
        <Form onSubmit={handleSearch}>
          <Row>
            <Col xs={12} md={8} lg={9} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Enter food description (e.g., 1 large apple, 1 cup rice)"
                value={query}
                onChange={handleQueryChange}
                required
              />
            </Col>
            <Col xs={12} md={4} lg={3}>
              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Search'}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* --- Loading State --- */}
        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* --- Error Display --- */}
        {error && (
          <Alert variant="danger" className="mt-4">{error}</Alert>
        )}

        {/* --- Results Display --- */}
        {/* Map over the foods array */}
        {foods.length > 0 && !loading && !error && (
          <div className="mt-4">
            <h3>Results for: "{query}"</h3>
            {foods.map((food, index) => (
              // Display each food item found by the natural language query
              <Card key={index} className="mb-3">
                <Row g={0}> {/* g={0} removes gutters */}
                   {/* Optional Image Column */}
                   {food.photo?.thumb && (
                    <Col md={3} className="d-flex align-items-center justify-content-center p-2">
                      <Card.Img src={food.photo.thumb} alt={food.food_name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
                    </Col>
                   )}
                   {/* Details Column */}
                   <Col md={food.photo?.thumb ? 9 : 12}>
                      <Card.Body>
                        <Card.Title className="h5">{food.food_name || 'N/A'}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Serving: {food.serving_qty || 1} {food.serving_unit || ''} ({formatNutrient(food.serving_weight_grams)})
                        </Card.Subtitle>
                        <ListGroup variant="flush">
                          {/* ** CHECK CONSOLE LOG for exact nutrient names from Nutritionix ** */}
                          {/* Common examples below (nf_... keys) */}
                          <ListGroup.Item>
                            Calories: {formatNutrient(food.nf_calories, 'kcal')}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Protein: {formatNutrient(food.nf_protein)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Total Fat: {formatNutrient(food.nf_total_fat)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                             Saturated Fat: {formatNutrient(food.nf_saturated_fat)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Carbohydrates: {formatNutrient(food.nf_total_carbohydrate)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                             Fiber: {formatNutrient(food.nf_dietary_fiber)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Sugar: {formatNutrient(food.nf_sugars)}
                          </ListGroup.Item>
                           <ListGroup.Item>
                            Sodium: {formatNutrient(food.nf_sodium, 'mg')}
                          </ListGroup.Item>
                           <ListGroup.Item>
                            Potassium: {formatNutrient(food.nf_potassium, 'mg')}
                          </ListGroup.Item>
                           <ListGroup.Item>
                            Cholesterol: {formatNutrient(food.nf_cholesterol, 'mg')}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                   </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}

      </Card.Body>
    </Card>
  );
}

export default NutritionSearch;