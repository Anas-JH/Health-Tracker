import React from 'react';

// Health Conditions Data 
const healthConditionsData = [
  {
    title: "Common Cold",
    description: "A viral infection of the upper respiratory tract, primarily affecting the nose and throat.",
    advice: [
      "Rest and get plenty of sleep.",
      "Drink plenty of fluids to stay hydrated.",
      "Use over-the-counter pain relievers for fever and aches.",
      "Consider saline nasal drops to relieve congestion."
    ]
  },
  {
    title: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness.",
    advice: [
      "Rest is crucial to allow your body to recover.",
      "Drink lots of clear fluids like water, broth, and electrolyte drinks.",
      "Antiviral medications can be prescribed by a doctor, especially for high-risk individuals.",
      "Stay home from work or school to prevent spreading the virus."
    ]
  },
  {
    title: "Headache",
    description: "Pain in the head that can range from mild to severe and occur on one or both sides of the head.",
    advice: [
      "Over-the-counter pain relievers like ibuprofen or acetaminophen can be effective.",
      "Rest in a quiet, dark room.",
      "Apply a cold or warm compress to your forehead or neck.",
      "Ensure you are adequately hydrated."
    ]
  },


];

function HealthConditionsPage() {
    return (
      <div className="page-content">
        <h1>Common Health Conditions</h1>
        <p>Below is a list of common health conditions with descriptions and general advice:</p>
  
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}> 
          {healthConditionsData.map((condition, index) => (
            <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}> 
              <h2>{condition.title}</h2>
              <p>{condition.description}</p>
              {condition.advice && condition.advice.length > 0 && (
                <div>
                  <h3>General Advice:</h3>
                  <ul>
                    {condition.advice.map((adviceItem, adviceIndex) => (
                      <li key={adviceIndex}>{adviceItem}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default HealthConditionsPage;