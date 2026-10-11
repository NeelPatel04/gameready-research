# GameReady Readiness Check-In

## Project Overview

This is a small React app made for my GameReady Research Milestone. GameReady is a fitness and nutrition web app meant to help college student athletes.

This sample app focuses on a daily readiness check-in. The user enters information about how they are feeling before a workout, including sleep, energy, soreness, stress, hydration, and available workout time. The app then calculates a readiness score and recommends either a full workout, a modified workout, or a recovery day.

## Features

- User can enter hours of sleep and available workout time.
- User can select their energy level, muscle soreness, stress level, and hydration level.
- The app validates that sleep is between 0 and 14 hours and available workout time is between 0 and 180 minutes.
- The app calculates a readiness score out of 18 points.
- The app displays a readiness percentage and a recommendation.
- The app gives extra recovery tips when the user has low sleep, low hydration, high stress, or high soreness.
- The user can reset the form.
- The app saves the user’s 10 most recent check-ins in browser local storage.
- The user can clear their saved check-in history.

## How the Readiness Score Works

Each category is worth 1 to 3 points:

- More sleep gives a higher score.
- Higher energy gives a higher score.
- Lower soreness gives a higher score.
- Lower stress gives a higher score.
- Better hydration gives a higher score.
- More available workout time gives a higher score.

The app adds the points together and converts the result into a percentage.

- 70% or higher: Full training session
- 50% to 69%: Modified workout
- Below 50%: Recovery day

## Technologies Researched

### React

React is a JavaScript library used to build interactive user interfaces. I used React because GameReady will need forms, dashboards, user data, and pages that update when users interact with them.

**Pros**
- React makes it easier to organize an app into components.
- It updates the page without needing to reload it.
- It works well for interactive forms and dashboards.
- React can connect to a Java backend using APIs.

**Cons**
- React only handles the frontend, so the final project will still need a backend and database.
- Managing state can become harder as the app gets larger.

### Vite

Vite is the tool I used to create and run this React project.

**Pros**
- Quick setup for a React project.
- Fast local development server.
- Creates a basic project structure automatically.

**Cons**
- Vite is mainly for frontend development and does not provide a database, user login system, or backend.

### npm

npm is the package manager used in this project. It downloads the packages needed for the app and runs project commands.

Commands used:

- `npm install` installs the project dependencies.
- `npm run dev` starts the local development server.
- `npm run build` creates a production build of the app.

### Java Spring Boot and PostgreSQL

For the final GameReady project, Java Spring Boot and PostgreSQL could be used for the backend and database.

Spring Boot could handle user accounts, workout plans, food logs, progress data, and communication between the React frontend and the database. PostgreSQL would work well because the project has structured data, such as users, workouts, meals, sleep records, and readiness check-ins.
