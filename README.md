## How to contribute
Create or pick a feature from https://github.com/shescoding/projects-platform-frontend/projects/1.

## Community
Join our slack space at She's Coding #projects channel to discuss this projects or ask questions.


## Installation guide

### To begin with, make sure you have following versions of yarn, npm and Node
1. `node: v8.16.0` - Feel free to download installer here - https://nodejs.org/en/blog/release/v8.16.0/ <br />
2. `npm: 6.4.1` - `npm i npm@6.4.1` <br />
3. for mac users you might need to do `xcode-select --install`
4. Install brew - https://treehouse.github.io/installation-guides/mac/homebrew
5. `yarn: 1.17.0` - `brew install yarn` (latest version should be fine)<br />

On every step run the command to check that `npm -v`, `node -v`, `yarn -v` etc.

In the project directory:<br />
`cd your_path/projects-platform-frontend`<br />

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

Server installation
Get postgress 11.9 from here - https://www.enterprisedb.com/downloads/postgres-postgresql-downloads


### `yarn server`

Runs the backend server on port 5000.<br />
On Mac:
1. Go to https://postgresapp.com/downloads.html
"Postgres.app with PostgreSQL 10, 11 and 12" - download and start it (TODO: provide screenshots)
2. Dowload Postico from https://eggerapps.at/postico/


### `About creating psql database locally`
TODO: Updates steps for DB installation.
- First, make sure you install and setup postgreSQL in your computer.
- Secondly, connect to psql server(run ```psqlbrew services start postgresql``` or ```sudo service postgresql start```) and create a database called scproject in psql(run ```CREATE DATABASE scproject;```).
- Then, since you already have the schema.sql in the server/data, just need to create a .env file with this variable (DATABASE_URL=postgres://your-psql-username:your-psql-password@LOCALHOST:5432/scproject) in the root. ) in there to link your node with psql.
- Lastly, in your terminal:
  1. connect to psql server. (run ```psqlbrew services start postgresql``` for Mac or ```sudo service postgresql start``` for windows and linux)
  2. connect schema.sql to psal (run ```psql -d YOUR-DB-NAME -f FILE/PATH/TO/schema.sql;```)
  3. check if db is updated(run ```\c scproject;``` to go into db, then run ```\d;``` to see if tables are created, lastly run ```SELECT * FROM table-name;``` to check the contents in that table)


## Q & A
If you see "Something is already running on port 3000"? (on Macs)
`lsof -i tcp:3000 ` and `sudo kill your_PID_num`
