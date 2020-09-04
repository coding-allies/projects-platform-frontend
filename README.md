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




## Install Nodemon
In your terminal, run npm i -g nodemon. Run the command nodemon --version to confirm proper installation of Nodemon.

## Install PostgreSQL using WSL

This doc explains how to install PostgreSQL 10 for Windows WSL

We are installing this through the Ubuntu command line since we want this software to run in the Linux environment. You can check out the PostgreSQL Linux install docs [here](https://www.postgresql.org/download/linux/ubuntu/).

## Install
1. Open a terminal (the Ubuntu app) and then go to the root of the Ubuntu Subsystem by typing `cd ~ `.
2. Run `lsb_release -a` and make note of the `Codename` listed.
3. Type `sudo nano ../../etc/apt/sources.list`. This will open a file on Ubuntu using the Nano editor.
4. At the bottom of this file, paste in the line `deb http://apt.postgresql.org/pub/repos/apt/ CODENAME-pgdg main`, replacing CODENAME with the word you noted in step 2.
5. When that's done, press `ctrl + x` together to close the file, press `y` when prompted to save your changes, and `enter` to finally close.
6. Next, copy these 2 lines and paste them into your terminal:
  ```
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  sudo apt-get update
  ```
  This will add postgresql 10 to your repositories so you can install the latest version of Postgresql.

7. After the update is complete, enter in the line `sudo apt-get install postgresql-10` and press `y` when prompted.
8. To launch the postgres service, type `sudo service postgresql start`.

## Postgres User Setup

**Verifying Installation And Setting A Password**
- You should be able to run the command `sudo -u postgres psql`. You will be asked for your administrator password - this is what you usually enter when you run `sudo` commands. This will log you into the psql prompt as the user postgres.
- You should now have a prompt that looks like `postgres=#`. You can run SQL commands from here, which must end in semicolons.
- If you were not prompted for a default user or password, we will set one using psql. If you type `\du`, you can get a list of users associated with PostgreSQL. You should see a single user, `postgres`. You will need to set up a new role for your machine's default user. This is the username that appears at the beginning of your terminal prompt, and when you log into your machine.
- In your SQL shell, type the following: `CREATE ROLE your-username-here WITH LOGIN PASSWORD 'your-password-here';`, replacing "your-password-here" with whatever you want it to be. Remember that your password must be wrapped in quotes. The username should not be wrapped in quotes. *Don't forget the semicolon*.
- If successful, you will receive the feedback `CREATE ROLE`.
- Now we need to grant that user administrative control. In your SQL shell, type the following: `ALTER ROLE your-username-here WITH superuser;`, replacing "your-username-here" with the username you created a role for in the previous step.
- If successful, you will receive the feedback `ALTER ROLE`.
- Next, we need to create a default database for your new user and assign ownership of it to your new account. In the SQL shell, type the following: `CREATE DATABASE your-username-here;`, replacing "your-username-here" with your username. On success, you will receive the feedback `CREATE DATABASE`.
  - Note: You might get a `WARNING: could not flush dirty data: Function not implemented` warning many times when you run this command. This is okay! Let the command keep running, and you should eventually see success.
- To change the owner of your database from the `postgres` user to your user, type the folliwing: `ALTER DATABASE your-username-here OWNER TO your-username-here;`, replacing "your-username-here" with your username. On success, you will receive the feedback `ALTER DATABASE`.
- Close your SQL shell with `\q` or `ctrl-D`. Type `psql` again and your SQL shell should now open as your default user. Hooray!

**If Using PostgreSQL Version > 11 OR Having Postgres Issues**
- Using your ubunutu WSL terminal, navigate to `/etc/postgresql/11/main` and open the postgresql.conf file with `code postgresql.conf`
- Search for the setting `fsync`, it may be commented out.

- The full line should read exactly: 
```
 fsync=off # flush data to disk for crash safety  
```

## Suggestion

Since typing out `sudo service postgres start` all the time can be tedious, and you'll need to run this when you restart your computer, we recommend you set up an alias for this.

1. Open a terminal and type `cd ~`, then type `nano .profile`. This will open your `.profile` which controls what your terminal does and looks like.
1. Add this line next to any other aliases that you have:
```
alias pgstart='sudo service postgresql start'
```
This will allow you to type `pgstart` to start running the psql service. This is an example of a Quality of Life enhancement, something that makes your life easier and faster as a developer.

You can change `pgstart` to what ever you want, but just be careful you don't overwrite something that postgres might use.


#### ALL USERS: Startup and Create some databases

1. Login to psql.
  - For Mac, type `psql` from terminal.
    - If the response is, "Can't find database *yourUserName*", run `createdb -U yourUserName`, then run `psql` again.
  - For Linux, run `psql`.
  - For WSL, run `pgstart` and `psql` and enter your password if prompted.
2. You should be at a prompt that looks like `postgres=#` or `<your-username-here>=#`.
3. Enter the following command: `CREATE DATABASE city_explorer;`. *Note the semicolon. If you forget it, your prompt will go to a new line and look like* `postgres-#`. *This means you have an unterminated command and the prompt will just keep going to new lines until you enter a semicolon*.
  - You should receive the feedback "CREATE DATABASE".
4. Verify that your databases were created by running `\l` (no semicolon). You should see a list of databases, including `city_explorer`. You should be able to connect to a database by running `\c DATABASE_NAME`, e.g. `\c city_explorer`.
> If running `\l` puts you into a view with the highlighted word `(END)` at the bottom of your terminal, you can type `q` to escape that view.
<!-- ### [⇐ Previous](./04_updating_terminal.md) | [Next ⇒](./06_final_steps.md) -->
