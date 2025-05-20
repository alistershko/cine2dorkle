# Double Feature

<!-- 
TO DO
REWRITE INSTALLATION INSTRUCTIONS
WILL NEED TO INCLUDE INSTRUCTIONS ABOUT GETTING AN API KEY FROM TMDB
AND CREATING AN ENV FILE WITH API KEY IN IT
ACKNOWLEDGE TMDB
INCLUDE INFO ABOUT DEPLOYED VERSION
 -->

## Description

Double Feature is a movie themed game where the player needs to make connections between movies based on the cast.

### Background

In the project, we were allowed to create anything and started without any existing code.
Due to the Easter longweekend, we worked on a reduced timeframe having just 8 days to complete
the project from initial planning to deployment and presenting.

### Structure

This repo contains two applications:

- A frontend React App
- A backend api using JS

These two applications communicates through HTTP requests, passing JSON data  
between each other, and need to be run separately.

### Video demo

PUT A SCREEN RECORDING OF A RUN THROUGH OF THE SITE HERE

### Features

- Dark mode/light mode
- Audio on/off
- How to Play modal
- Difficulty selector (easy/hard)
  - Easy mode: always shows cast, 30 second timer
  - Hard mode: only shows cast on first film, 20 second timer
- Start game button
- Fetches initial film from API
- Input box for player to name a movie with overlapping cast member
- Auto complete dropdown box
- Dropdown box can be navigated using keyboard arrows and enter or trackpad/mouse
- Timer to track turn length
- End of game modal to show score and play again button
- Can navigate back to home page using logo

### Out of Scope Features

**Accounts**

- Users can create an account
- Users can login
- Users can track their scores on their accounts

**Multiplayer**

- Use of Web Sockets to create a multiplayer game

**Styling and misc.**

- Optimising for use on a mobile device
- Accessibility features for people with disabilities
- Animated buttons
- Refining the UX/UI

### Documentation

[Documentation of our applications can be found here.](./docs)

There is documentation for the [frontend](./docs/frontend_routes).

### Card wall

We developed this project with an **agile** workflow, working in week-long sprints and using  
a Trello board to track our tasks and help plan sprints.

Link to our Trello board: https://trello.com/b/M94bAVBI/final-project-double-feature

## Installation

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up the project

1. Fork this repository
2. Rename the fork
3. Clone the fork to their local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```

```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to the
`http://localhost:5173` to get to the homepage and start exploring the application.

## Authors and acknowledgment

This project was created by:

[Kate Bancroft](https://github.com/KI-22)
[Fliss Douglas](https://github.com/flissd1795)
[Alister Ko](https://github.com/alistershko)  
[Etienne Le Goater](https://github.com/Elegoater)  
[Ben Loveday](https://github.com/StrawberryScot)
[Emily Sadler](https://github.com/EmiSadler)
[Louis Tse](https://github.com/Louistwt)

Under the guidance of our coach at [Makers Academy](https://github.com/makersacademy):  
[John Forster](https://github.com/JohnForster)
