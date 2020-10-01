// const cookieSession = require('cookie-session');
const { URLSearchParams } = require('url');
const express = require('express');
const router = express.Router();
const pg = require('pg');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const axios = require('axios');

require('dotenv').config();
const client_id = process.env.GITHUB_KEY;
const client_secret = process.env.GITHUB_SECRET;

//connect to the database
const client = new pg.Client(process.env.DATABASE_URL);
client.connect()

function User(data) {
  const now = new Date();
  this.auth_token = data.auth_token ? data.auth_token : '';
  this.github_token = data.github_token ? data.github_token : '';
  this.company = data.company ? data.company : '';
  this.github_username = data.github_username ? data.github_username : '';
  this.github_id = data.github_id ? data.github_id : '';
  this.github_url = data.github_url ? data.github_url : '';
  this.avatar_url = data.avatar_url ? data.avatar_url : '';
  this.gravatar_url = data.gravatar_url ? data.gravatar_url : '';
  this.last_login = data.last_login ? data.last_login : now;
  this.is_superuser = data.is_superuser ? data.is_superuser : false;
  this.name = data.name ? data.name : '';
  this.email = data.email ? data.email : '';
  this.is_active = data.is_active ? data.is_active : true;
  this.date_joined = data.date_joined ? data.date_joined : now;
  this.hireable = data.hireable ? data.hireable : false;
}

function Project(data) {
  this.name = data.name ? data.name : '';
  this.github_url = data.github_url ? data.github_url : '';
  this.description = data.description ? data.description : '';
  this.looking_for = data.looking_for ? data.looking_for : '';
  this.created = data.created ? data.created : '';
  this.updated = data.updated ? data.updated : '';
  this.lead_id = data.lead_id ? data.lead_id : '';
  this.contributors = data.contributors ? data.contributors : [];
}

function JobInfo(data) {
  this.name = data.name ? data.name : '';
}

router.get("/", (req, res) => {
  res.send("Hello GitHub auth");
});

router.get("/auth/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=read:user`;
  res.redirect(url);
});

router.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  let access_token = await getAccessToken(code, client_id, client_secret)
    .then((access_token) => {
      return access_token;
    }).catch(error => {
      return null;
    });
  if (access_token === null) {
    res.status(400).send("Error: could not get access token from Github");
  }
  await fetchGitHubUser(access_token)
    .then(async (user) => {
      if (user) {
        await checkUser(user, access_token, res);
      } else {
        res.status(400).send("Error: Github user is null");
      }
    })
    .catch(err => {
      res.status(400).send("Error: Could not get user from Github");
    });
});

async function getAccessToken(code, client_id, client_secret) {
  const result = await axios(
    {
      method: 'post',
      url: "https://github.com/login/oauth/access_token",
      data: {
        client_id,
        client_secret,
        code
      }
    }
  ).then(data => {
    const params = new URLSearchParams(data.data);
    const access_token = params.get("access_token");
    return access_token;
  })
    .catch(err => {
      throw err;
    });
  return result;
}

async function fetchGitHubUser(token) {
  const request = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + token
    }
  });
  return await request.json();
}

async function checkUser(user_data, github_token, res) {
  let SQL = 'SELECT * FROM Users WHERE github_id=$1;';
  let values = [user_data.id];
  client.query(SQL, values)
    .then(async (result) => {
      const user = result.rows[0];
      if (user !== undefined) {
        const auth_token = jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: '24h' });
        let SQL = 'UPDATE Users SET auth_token=$1 WHERE github_id=$2;';
        let values = [auth_token, user_data.id];
        client.query(SQL, values)
          .then(result => {
            res.redirect("http://localhost:3000/#/token/" + auth_token);
          })
          .catch(err => {
            throw err;
          });
      } else {
        const auth_token = await createUser(user_data, github_token);
        res.redirect("http://localhost:3000/#/token/" + auth_token);
      }
    })
    .catch(err => {
      throw err;
    });
}

async function createUser(user_data, github_token) {
  const auth_token = jwt.sign(
    { userId: user_data.id },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' });

  const newUser = new User({
    auth_token: auth_token,
    github_token: github_token,
    github_username: user_data.login,
    name: user_data.name,
    github_id: user_data.id,
    github_url: user_data.url,
    avatar_url: user_data.avatar_url,
    gravatar_url: user_data.gravatar_id,
    company: user_data.company,
    hireable: user_data.hireable,
    email: user_data.email,
  });

  let SQL = 'INSERT INTO users (auth_token, github_token, company, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, name, email, is_active, date_joined, hireable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id;';
  let values = [newUser.auth_token, newUser.github_token, newUser.company, newUser.github_username, newUser.github_id, newUser.github_url, newUser.avatar_url, newUser.gravatar_url, newUser.last_login, newUser.is_superuser, newUser.name, newUser.email, newUser.is_active, newUser.date_joined, newUser.hireable];
  return client.query(SQL, values)
    .then(() => {
      return auth_token;
    })
    .catch(err => {
      throw err;

    });
}

async function getUser(auth_token) {
  let SQL = 'SELECT * FROM Users WHERE auth_token=$1;';
  let values = [auth_token];
  return client.query(SQL, values)
    .then(result => {
      const user = result.rows[0];
      if (user !== undefined) {
        return user;
      } else {
      }
    })
    .catch(err => {
      throw err;
    });
}

async function getUserByID(userID) {
  let SQL = 'SELECT * FROM Users WHERE id=$1;';
  let values = [userID];
  return client.query(SQL, values)
    .then(result => {
      const user = result.rows[0];
      if (user !== undefined) {
        return user;
      } else {
      }
    })
    .catch(err => {
      throw err;
    });
}

const getToken = (tokenString) => {
  if (tokenString === null || tokenString === undefined || tokenString === "") {
    return null;
  }
  const token = tokenString.split(" ")[1];
  return token;
}

const checkName = user => {
  if (user === undefined) {
    return "Error";
  }
  if ('name' in user && user.name !== '') {
    return user.name;
  } else {
    return user.github_username;
  }
}

async function createProject(project_data) {
  const newProject = new Project({
    name: project_data.name,
    github_url: project_data.github_url,
    description: project_data.description,
    looking_for: project_data.looking_for,
    created: project_data.created,
    updated: project_data.updated,
    lead_id: project_data.lead_id,
    contributors: project_data.contributors,
  });

  let SQL = 'INSERT INTO projects (name, github_url, description, looking_for, created, updated, lead_id, contributors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;';
  let values = [newProject.name, newProject.github_url, newProject.description, newProject.looking_for, newProject.created, newProject.updated, newProject.lead_id, newProject.contributors];
  return client.query(SQL, values)
    .then(() => {
      return newProject.name;
    })
    .catch(err => {
      throw err;
    });
}

async function getProject(is_auth = false) {
  let SQL = 'SELECT * FROM projects;';

  return client.query(SQL)
    .then(async result => {
      const projects = result.rows;
      let projectsWithLeads = [];
      if (projects !== undefined) {
        for (let project of projects) {
          const lead = await getUserByID(project.lead_id);
          let lead_obj = { name: lead.name, position: lead.position, experience: lead.experience_lvl };
          if (is_auth) {
            lead_obj['email'] = lead.email;
          } else {
            project.github_url = '';
          }
          project['lead'] = lead_obj;
          projectsWithLeads.push(project);
        }
        return projects;
      } else {
        throw Error('projects are undefined within getProject function');
      }
    })
    .catch(err => {
      throw err;
    });
}

router.get("/projects/user/", async (req, res) => {
  const auth_token = getToken(req.headers.authorization);
  if (auth_token === null) {
    return res.sendStatus(401);
  }
  // make sure the authentication flow works. click signin-> authenticate with github=> return to home page
  // implement sign out
  const user = await getUser(auth_token, res);
  const name = checkName(user);
  const authUser = {
    name: name,
    is_authenticated: true,
    auth_token: auth_token,
  };
  return res.json(authUser);
});


router.get("/projects/logout/", (req, res) => {
  const auth_token = getToken(req.headers.authorization);
  if (auth_token === null) {
    return res.sendStatus(401);
  }
  let SQL = 'SELECT * FROM Users WHERE auth_token=$1;';
  let values = [auth_token];
  client.query(SQL, values)
    .then(result => {
      const user = result.rows[0];
      if (user !== undefined) {
        const newAuth_token = '';
        let SQL = 'UPDATE Users SET auth_token = $1 WHERE auth_token=$2;';
        let values = [newAuth_token, auth_token];
        client.query(SQL, values)
          .then(result => {
            return res.json({ result: "success" });
          })
          .catch(err => {
            console.error("Logout Error: could not update the DB", err);
            throw err;
          });
      } else {
        return res.json({ result: "success" });
      }
    })
    .catch(err => {
      console.error("Logout Error: could not find the user in DB", err);
      throw err;
    });
});

router.get("/projects/all/public/", async (req, res) => {
  const projects = await getProject();
  return res.json(projects);
});

router.get("/projects/all/", async (req, res) => {
  const auth_token = getToken(req.headers.authorization);
  if (auth_token === null) {
    return res.sendStatus(401);
  }
  const projects = await getProject(true);
  return res.json(projects);
});

async function addNewProject(auth_token, position, experience_lvl, new_project) {
  let SQL = 'UPDATE Users SET position=$2,experience_lvl=$3 WHERE auth_token=$1 RETURNING id;';
  let values = [auth_token, position, experience_lvl];
  await client.query(SQL, values)
    .then(async (result) => {
      const user_id = result.rows[0]['id'];
      await createProject({ ...new_project, lead_id: user_id });
    })
    .catch(err => {
      throw err;
    });
}

router.post("/projects/add_project/", async (req, res) => {
  const github_url = req.body["github_url"];
  const repo_details = github_url.split(
    'https://github.com/')[1];
  const response = await fetch(
    'https://api.github.com/repos/' + repo_details);
  const repo_data = await response.json();
  // Get contributors
  const contributors_url_response = await fetch(
    repo_data["contributors_url"]);
  const contributors_data = await contributors_url_response.json();
  const contributors_list = [];
  for (const contrib of contributors_data) {
    contributors_list.push(contrib['login']);
  }

  // Field validation
  if (contributors_list.length === 0 || req.body['position'] === "" || req.body['experience_lvl'] === "" || repo_data["name"] === "" || req.body["github_url"] === "" || repo_data["description"] === "" || req.body["looking_for"] === "") {
    throw new Error(
      "Ensure all the fields are filled out and Github Repository has description");
  }

  const auth_token = getToken(req.headers.authorization);
  const now = new Date();
  const new_project = {
    name: repo_data["name"],
    github_url: req.body["github_url"],
    description: repo_data["description"],
    looking_for: req.body["looking_for"],
    created: now,
    updated: now, // TODO: automate
    contributors: contributors_list,
  };
  // TODO: atomic transaction
  // TODO: safeguard and return error messages
  await addNewProject(auth_token, req.body['position'], req.body['experience_lvl'], new_project).catch(e => console.error(e));
  return res.send({ "result": "success" });
});

async function getJobInfo(name_to_search = '', table, field) {
  let SQL = `SELECT * FROM ${table} WHERE ${field} LIKE '${name_to_search}%';`;
  return client.query(SQL)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      throw err;
    });
};

async function createJobInfo(job_info_data, table, field) {
  const newJobInfo = new JobInfo({
    name: job_info_data.name
  });

  let SQL = `INSERT INTO ${table} (${field}) VALUES ('${job_info_data.name}');`;
  return client.query(SQL)
    .then(() => {
      return newJobInfo.name;
    })
    .catch(err => {
      throw err;
    });
}

router.get("/getPositions", async (req, res) => {
  const positions = await getJobInfo(req.body.name_to_search, 'Positions', 'name');
  return res.json(positions);
});

router.post("/addPosition", async (req, res) => {
  await createJobInfo(req.body, 'Positions', 'name').catch(e => console.log(e));
  return res.send({
    "result": "success"
  });
})

router.get("/getCompanies", async (req, res) => {
  const companies = await getJobInfo(req.body.name_to_search, 'Companies', 'name');
  return res.json(companies);
});

router.post("/addCompany", async (req, res) => {
  await createJobInfo(req.body, 'Companies', 'name').catch(e => console.log(e));
  return res.send({
    "result": "success"
  });
})

module.exports = router;
