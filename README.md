# Boss Machine

## Project Overview

In this project, you will create an entire API to serve information to a Boss Machine, a unique management application for today's most accomplished entrepreneurs. You will create routes to manage your 'minions', your brilliant 'million dollar ideas', and to handle all the annoying meetings that keep getting added to your busy schedule.

## How to Use:

To start, download the code for this project from the master branch. After downloading the zip folder, double click it to uncompress it and access the contents. You'll need Node.js for this project.

Once you have the project downloaded, open the root project directory in your terminal. Run `npm install` to install the dependencies of this project and build the front-end application. Once it has finished installing, you can run `npm run start` to begin your server. You'll see `Server listening on port 4001` in the terminal. You can kill this process with the `Ctrl + C` command.

To see the application in its front end working with back end state (locally), simply open **index.html** in a web browser. You should use [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) (at least version 60) or [Firefox](https://www.mozilla.org/en-US/firefox/new/) (at least version 55).

### Server Code

In **server.js**, I changed some boilerplate code, but added key functionality to allow it to run. I:

- Set up body-parsing middleware with the `body-parser` packagae.
- Set up CORS middleware with the `cors` package.
- Mounted the existing `apiRouter` at `/api`.
- Started the server listening on the provided `PORT`.

### API Routes

- The routes live inside the **server** folder. Each 'router' is responsible for handling the different url paths possible.
- The 'database' exists in **server/db.js**. The beginning database will be seeded every time the server is restarted. So this will have to be altered if you want a working, living, continuing version of the project.

 #### Routes

- `/api/minions`
  - GET /apis/minions to get an array of all minions.
  - POST /apis/minions to create a new minion and save it to the database.
  - GET /apis/minions/:minionId to get a single minion by id.
  - PUT /apis/minions/:minionId to update a single minion by id.
  - DELETE /apis/minions/:minionId to delete a single minion by id.
- `/api/ideas`
  - GET /apis/ideas to get an array of all ideas.
  - POST /apis/ideas to create a new idea and save it to the database.
  - GET /apis/ideas/:ideaId to get a single idea by id.
  - PUT /apis/ideas/:ideaId to update a single idea by id.
  - DELETE /apis/ideas/:ideaId to delete a single idea by id.
- `/apis/meetings`
  - GET /api/meetings to get an array of all meetings.
  - POST /api/meetings to create a new meeting and save it to the database.
  - DELETE /api/meetings to delete _all_ meetings from the database.

For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.

For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.

### Working with the 'Database'

The **server/db.js** file exports helper functions for working with the database arrays. They follow these **Schemas**:

- Minion:
  - id: string
  - name: string
  - title: string
  - salary: number
- Idea
  - id: string
  - name: string
  - description: string
  - numWeeks: number
  - weeklyRevenue: number
- Meeting
  - time: string
  - date: JS `Date` object
  - day: string
  - note: string

  Within the Minion router is the schema to implement routes to allow bosses to add and remove work from their minions' backlogs within the API

 - Work:
   - id: string
   - title: string
   - description: string
   - hours: number
   - minionId: string

Routes:

- GET /api/minions/:minionId/work to get an array of all work for the specified minon.
- POST /api/minions/:minionId/work to create a new work object and save it to the database.
- PUT /api/minions/:minionId/work/:workId to update a single work by id.
- DELETE /api/minions/:minionId/work/:workId to delete a single work by id.

### Custom Middleware

- There is a custom middleware function `checkMillionDollarIdea` that will come in handy in some /apis/ideas routes. This function is written in the **server/checkMillionDollarIdea.js** file. This function will make sure that any new or updated ideas are still worth at least one million dollars! The total value of an idea is the product of its `numWeeks` and `weeklyRevenue` properties.

## Testing

A testing suite has been provided to check all routes, functionality, and edge cases.

To run these tests, first open the root project directory in your terminal. Then run `npm install` to install all necessary testing dependencies and run `npm run test`. You will see a list of tests that ran with information
about whether or not each test passed for each specific route.
