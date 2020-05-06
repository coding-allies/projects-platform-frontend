## How to contribute
Create or pick a feature from https://github.com/shescoding/projects-platform-frontend/projects/1.

## Community
Join our slack space at She's Coding #projects channel to discuss this projects or ask questions.


## Installation guide

### To begin with, make sure you have following versions of yarn, npm and Node
`node: v8.16.0` <br />
`npm: 6.4.1` <br />
`yarn: 1.17.0` <br />

In the project directory (`cd your_path/projects-platform-frontend`), you can run:

### `yarn`

Installs all the needed dependencies

### `yarn build`

Builds the project

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn server`

Runs the backend server on port 5000.<br />


### `About creating psql database locally`

- First, make sure you install and setup postgreSQL in your computer.
- Secondly, connect to psql server(run ```psqlbrew services start postgresql``` or ```sudo service postgresql start```) and create a database called scproject in psql(run ```CREATE DATABASE scproject```).
- Then, since you already have the schema.sql in the server/data, just need to create a .env file with this variable (DATABASE_URL=postgres://your-psql-username:your-psql-password@LOCALHOST:5432/scproject) in the root. ) in there to link your node with psql.
- Lastly, in your terminal:
  1. connect to psql server. (run ```psqlbrew services start postgresql``` for Mac or ```sudo service postgresql start``` for windows and linux)
  2. connect schema.sql to psal (run ```psql -d YOUR-DB-NAME -f FILE/PATH/TO/schema.sql;```)
  3. check if db is updated(run ```\c scproject;``` to go into db, then run ```\d;``` to see if tables are created, lastly run ```SELECT * FROM table-name;``` to check the contents in that table)