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
- Secondly, connect to psql server(run ```psqlbrew services start postgresql``` or ```sudo service postgresql start```) and create a database called scproject in psql(run ```CREATE DATABASE scproject;```).
- Then, since you already have the schema.sql in the server/data, just need to create a .env file with this variable (DATABASE_URL=postgres://your-psql-username:your-psql-password@LOCALHOST:5432/scproject) in the root. ) in there to link your node with psql.
- Lastly, in your terminal:
  1. connect to psql server. (run ```psqlbrew services start postgresql``` for Mac or ```sudo service postgresql start``` for windows and linux)
  2. connect schema.sql to psal (run ```psql -d YOUR-DB-NAME -f FILE/PATH/TO/schema.sql;```)
  3. check if db is updated(run ```\c scproject;``` to go into db, then run ```\d;``` to see if tables are created, lastly run ```SELECT * FROM table-name;``` to check the contents in that table)

# `Authentication & re-authentication flow`

## `Authentication flow at Login`

Get github auth token first and:

- if github_token already exist in our db - create a new auth_token and update the DB and send it back.
- if github_token does not exist in db - create a new user with auth_token and send it back.

Calling user API flow in use effects - (periodically validating the token):

- Pass the token in authorization header.
- In API check for db:
  - if not there, sign out & redirect;
  - if there, return user object.



# Installing VSCode, Node.js, and Git with WSL(Ubuntu) on Windows

After finishing this doc you will have VSCode, Node.js, and Git installed on your machine.

## VSCode

1. Vist [VSCode](https://code.visualstudio.com/?wt.mc_id=adw-brand&gclid=Cj0KCQjw5-TXBRCHARIsANLixNw00R2vbdqnzLml-GvzCgbyqmgcAb9kyRQsC5LAPVS6tuBDZ9ws9pgaAsiLEALw_wcB) to download VSCode.
1. Launch the installer and follow the onscreen prompts.
1. **When you reach the section for `Additional tasks`, make sure every box is checked.**
1. Click install and continue to follow and onscreen prompts.

Once you are done, you can open up a terminal (the Ubuntu App) and type `code` to open VSCode. This may or may not require a restart first. 

## Node.js - Version 10.x

1. Open the Ubuntu app and type `cd ~` to bring you into the Ubuntu FS.
1. Type `sudo apt-get update`. This will tell Ubuntu's apt tool to update.
1. After it is done updating run the command:

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
```

then run:

```
sudo apt-get install -y nodejs
```

We will also install Node on Windows:

1. Visit <https://nodejs.org/en/download/> and download and run the Windows installer.

## Eslint

1. Search 'windows powershell' in the start menu and open it.
2. Run `npm i -g eslint` . When finished close windows powershell.

## Git

Git is already installed on Ubuntu as it comes built in. VSCode however also uses Git for it's source-control tool to work. But since VSCode is a Windows application, it doesn't know how to use Ubuntu's version of Git. 

1. Visit [git-scm.com](https://git-scm.com/) to download and install Git.
2. Follow the onscreen instructions.

    - Choose the default values for each prompt...
    - **EXCEPT** when it asks you to `Choose the default editor used by Git`... 
        - click the drop down and choose the VSCode option
        - Do NOT choose the "VSCode Insiders" option. 
    - This will allow you to handle merge conflicts in your editor instead of in your command line which is another reason to have Git on Windows as well.

3. Continue choosing the default options to finish the installation.

### Set the Git Config

The final step here is to add your email and name to the Git config. This will allow you to commit and push things to GitHub. Make sure to include the space after `.email` and `.name`, and always remember to close your quotes ' ' and " ".

1. Close and re-open a new Ubuntu terminal
1. Type `git config --global user.email 'your email here in single quotes'`.
1. Type `git config --global user.name 'Your Name In Single Quotes'`.
1. Type `git config --global core.editor 'code --wait'`.

### Verification

#### By the time you’ve completed the guide, you should be able to run the following commands in your terminal:

- `git --version`
- `node --version`

<!-- ### [⇐ Previous](./04_updating_terminal.md) | [Next ⇒](./06_final_steps.md) -->
