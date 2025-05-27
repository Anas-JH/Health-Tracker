# St Mary's Health Hub

## Project Overview

St Mary's Health Hub is a front-end web application. The application aims to provide users with an intuitive platform to access health information, track personal wellness metrics, and utilize various health-related tools. It is built using React, Vite, and React Bootstrap, integrating several third-party APIs for dynamic content and employing `localStorage` for client-side data persistence.

## Features Implemented

The application includes a range of features across basic, intermediate, and advanced categories:

**Core Features:**
*   **Homepage:** General health and wellness information, and an overview of the application's features.
*   **Health Conditions:** A static list providing descriptions and general advice for common health conditions.
*   **BMI Calculator:** Allows users to calculate their Body Mass Index and understand their weight category.

**API-Driven Features:**
*   **Health News Feed:** Displays the latest health-related news (sourced from NewsAPI, filtered for NHS-related content).
*   **Nutrition Search:** Enables users to search for nutritional information of various food items (using the Nutritionix API).
*   **Exercise Finder:** Allows users to find exercises based on selected muscle groups (using the API Ninjas Exercises API).

**Personalised Tracking & Well-being (Data persists using Local Storage):**
*   **Dashboard:**
    *   Daily Water Intake Tracker
    *   Daily Calorie Consumption Tracker
    *   Daily Steps Walked Tracker
*   **Well-being Section:**
    *   Mood Tracker: Allows users to log their daily mood with optional notes.
    *   Medication Reminders: Users can set reminders for medications, which are visually highlighted when due (within the current day and browser session).

**User Interface & Design:**
*   Responsive design built with React Bootstrap to ensure usability across various devices.
*   Custom styling applied for a consistent theme, inspired by NHS branding guidelines.
*   Interactive elements and visual feedback for user actions.
*   Icons used to enhance navigation and component clarity.

## Technologies Used

*   **Core Framework:** React with Vite as the build tool.
*   **Routing:** `react-router-dom` (v6.22.3) for client-side navigation.
*   **UI Components & Layout:** `react-bootstrap` and `bootstrap` (v5).
*   **HTTP Client:** `axios` for making API requests.
*   **Icons:** `react-icons`.
*   **Client-Side Storage:** Browser `localStorage` API.
*   **Styling:** CSS3 with custom CSS variables and media queries.
*   **Version Control:** Git and GitHub (private repository).

## Setup and Running the Project


1.  **Install Dependencies:**
    Navigate to the project's root directory in your terminal and run:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables (API Keys):**
    This project uses external APIs that require API keys.
    *   Create a new file named `.env` in the root of the project directory.
    *   Copy the content from the structure below.
    *   Obtain your own API keys from the respective services and replace the placeholder values.

    **`.env` file structure:**
    ```env
    VITE_NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE
    VITE_NUTRITIONIX_APP_ID=YOUR_NUTRITIONIX_APP_ID_HERE
    VITE_NUTRITIONIX_API_KEY=YOUR_NUTRITIONIX_API_KEY_HERE
    VITE_API_NINJAS_KEY=YOUR_API_NINJAS_KEY_HERE
    ```
    *   **API Providers:**
        *   NewsAPI: [https://newsapi.org/](https://newsapi.org/)
        *   Nutritionix: [https://developer.nutritionix.com/](https://developer.nutritionix.com/)
        *   API Ninjas: [https://api-ninjas.com/](https://api-ninjas.com/)

3.  **Start the Development Server:**
    Once dependencies are installed and the `.env` file is configured, run:
    ```bash
    npm run dev
    ```
    This will start the Vite development server. Open this URL in your web browser to view the application.

## Project Structure Overview

*   **`public/`**: Contains static assets like `index.html` and favicons.
*   **`src/`**: Contains the main application source code.
    *   **`components/`**: Reusable UI components (e.g., `NewsFeed.jsx`, `WaterTracker.jsx`).
    *   **`pages/`**: Top-level components for each route/view (e.g., `HomePage.jsx`, `DashboardPage.jsx`).
    *   **`App.jsx`**: Main application component defining layout and routes.
    *   **`main.jsx`**: Entry point of the application, renders the root component.
    *   **`App.css`**: Global custom styles and Bootstrap overrides.
    *   **`index.css`**: Minimal global styles, often for font imports or basic resets.
*   **`.env`**: (Locally created, not in Git) Stores environment variables like API keys.
*   **`.gitignore`**: Specifies intentionally untracked files by Git (like `node_modules/` and `.env`).
*   **`package.json`**: Lists project dependencies and scripts.

## Known Limitations

*   Data persistence is achieved via `localStorage`, meaning data is browser-specific and not synchronized across devices or backed up.
*   No user authentication or user accounts are implemented.
*   The medication reminder system provides visual cues within the app and does not use system-level browser notifications.
*   Reliance on free-tier third-party APIs may impose limitations on data availability and request frequency.

## Author

*   **[Mohamed Anas/ 2404309]**

---
