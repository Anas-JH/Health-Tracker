import React, { useState } from 'react';

function BMICalculator() {
  const [input, setInput] = useState({ weight: '', height: '' });
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  const calculateBmi = (event) => {
    event.preventDefault();

    const weightKg = parseFloat(input.weight);
    const heightCm = parseFloat(input.height);

    if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) {
      setBmi(null);
      setBmiCategory('Please enter valid positive numbers for weight and height.');
      return;
    }

    const heightM = heightCm / 100;
    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue.toFixed(2));

    const category = bmiValue < 18.5 ? 'Underweight' :
                     bmiValue < 25  ? 'Normal weight' :
                     bmiValue < 30  ? 'Overweight' :
                     'Obesity';
    setBmiCategory(category);
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <p>Enter your weight and height below to calculate your Body Mass Index.</p>

      <form onSubmit={calculateBmi}>
        <div>
          <label htmlFor="weightInput">Weight (kg): </label>
          <input
            type="number"
            id="weightInput"
            name="weight"
            value={input.weight}
            onChange={handleChange}
            placeholder="e.g., 70"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="heightInput">Height (cm): </label>
          <input
            type="number"
            id="heightInput"
            name="height"
            value={input.height}
            onChange={handleChange}
            placeholder="e.g., 175"
            required
          />
        </div>

        <button type="submit">Calculate BMI</button>
      </form>


      {bmi !== null && (
        <div className="bmi-results"> 
          <h2>Your Results</h2>
          <p>Your BMI is: <strong>{bmi}</strong></p>
          <p>This is considered: <strong>{bmiCategory}</strong></p>
        </div>
      )}


      {bmi === null && bmiCategory && (
         <p className="bmi-error-message">{bmiCategory}</p> 
      )}
    </div>
  );
}

export default BMICalculator;