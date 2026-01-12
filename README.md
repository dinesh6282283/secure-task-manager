# Intuition - A Full-Stack Task Management Application

Intuition is a modern, full-stack web application designed to help you manage your tasks efficiently. It features a user-friendly interface built with React and a robust backend powered by Node.js and Express.

## Features

*   **User Authentication:** Secure sign-up and sign-in functionality.
*   **Task Management:** Create, view, update, and delete personal tasks.
*   **RESTful API:** A well-structured backend API to handle all application logic and data persistence.

## Tech Stack

*   **Frontend:** React, Vite
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   Node.js (v14 or newer recommended)
*   npm (comes with Node.js)
*   A running MongoDB instance (either local or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd Intuition
    ```

2.  **Setup the Backend (`/server`):**
    Navigate to the server directory and install the dependencies.
    ```bash
    cd server
    npm install
    ```
    Next, create a `.env` file in the `/server` directory and add the following environment variables.
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_super_secret_jwt_key>
    ```

3.  **Setup the Frontend (`/client`):**
    Navigate to the client directory and install the dependencies.
    ```bash
    cd ../client
    npm install
    ```

## Usage

1.  **Run the Backend Server:**
    From the `/server` directory, execute:
    ```bash
    npm start
    ```
    The backend API will start on `http://localhost:5000`.

2.  **Run the Frontend Application:**
    In a separate terminal, from the `/client` directory, execute:
    ```bash
    npm run dev
    ```
    The React development server will start. You can view the application in your browser at `http://localhost:5173` (or whatever port Vite assigns).
