# SEA Salon Compfest

## Description

SEA Salon is a premier destination in the beauty industry, renowned for its exceptional services and excellent reviews. Offering a wide range of beauty treatments, SEA Salon specializes in haircuts and styling, manicures and pedicures, and facial treatments, all delivered by highly skilled stylists. With a commitment to redefining beauty and elegance, SEA Salon ensures that every client leaves feeling pampered and rejuvenated. To accommodate its rapidly growing clientele, SEA Salon is developing a web application that allows users to easily browse available services in the nearest branch and book appointments. The app will enhance the customer experience by providing a seamless and intuitive booking process, a review system for feedback, and a secure login for managing reservations and personal information. You can visit the website by visiting this [link](https://compfest-sea-salon.vercel.app/)

## Requirements

Before we get started, there are some requirements that need to be met to ensure the application runs smoothly and efficiently on your machine. Here are some of the things you have to install/have before running the application locally:

- Node.js
- Neon PostgreSQL database

## Setup

1. Setup the Neon PostgreSQL database.

    Create a Neon PostgreSQL database by following the instructions on the official Neon [website](https://neon.tech/). Ensure that you have the connection details ready for the next steps.

2. Setup the environment variables.

    Copy the `.env.example` file to .env and fill in the necessary environment variables with your database connection details and any other required configuration. This file will ensure that your application can connect to the database and run properly.

    ```bash
    cp .env.example .env
    ```

## How to Run

1. Clone the repository

    Clone the SEA Salon repository to your local machine using the following command:

    ```bash
    git clone https://github.com/SandWithCheese/compfest-sea-salon.git
    ```

2. Install all dependencies

    Navigate to the project directory and install all the necessary dependencies using npm:

    ```bash
    cd compfest-sea-salon
    npm install
    ```

3. Migrate the database schema to your Neon PostgreSQL database

    Run the migration script to set up the database schema in your Neon PostgreSQL database:

    ```bash
    npm run neon-migrate
    ```

4. Run the application

    Start the application in development mode. This will launch the server and you can access the app in your browser:

    ```bash
    npm run dev
    ```

    The application should now be running locally. Open your browser and navigate to `http://localhost:3000` to see the SEA Salon web application in action.

## Author

| Author               | Instagram    |
|----------------------|--------------|
| Ahmad Naufal Ramadan | @naufal.rmdn |
