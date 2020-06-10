// const cookieSession = require('cookie-session');
const { URLSearchParams } = require('url');
const express = require('express');
const router = express.Router();

const pg = require('pg');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const axios = require('axios');
const url = require('url');


require('dotenv').config();

const client_id = process.env.GITHUB_KEY;
const client_secret = process.env.GITHUB_SECRET;


//connect to the database
const client = new pg.Client(process.env.DATABASE_URL);
console.log('xxx', process.env.DATABASE_URL);
client.connect();
client.on('error', (err) => console.log(err));


router.get("/", (req, res) => {
  res.send("Hello GitHub auth");
});

router.get("/auth/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email`;
  console.log('XXX url', url);
  res.redirect(url);
});

router.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  let access_token = await getAccessToken(code, client_id, client_secret).then((access_token) => {
    console.log("CALLBACK access_token", access_token);
    return access_token;
  }).catch(error => {
    console.error("Error", error);
  });


  let user = await fetchGitHubUser(access_token)
    .then(user => {
      console.log('this is user within user', user);
      if (user) {
        // console.log('this is the req from call back');
        req.session.access_token = access_token;
        req.session.githubId = user.id;
        res.redirect("/admin");
      
      } else {
        res.status(400).send("Login did not succeed!");
      }
    })
    .catch(err => {console.log(`This is an error from fetching github user ${err}`)});

});

router.get("/admin", async (req, res) => {
  // if (req.session && req.session.githubId === 36176567) {
  //   res.send("Hello Leyla <pre>" + JSON.stringify(req.session, null, 2));
  //   // Possible use "fetchGitHubUser" with the access_token
  // } else {
  //   res.redirect("/auth/github");
  // }

});

async function getAccessToken(code, client_id, client_secret) {
  console.log('this is the arguments for post request', code, client_id, client_secret);

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
    console.log('Success ', data.data);
    const params = new URLSearchParams(data.data);
    console.log("XXX access token", params.get("access_token"));
    const access_token = params.get("access_token");
    return access_token;
  })
    .catch(err => {
      console.log('Error ' + err.message)
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



function checkUser(userId){
  let SQL = 'SELECT * FROM Users WHERE github_id=$1;';
  let values = [userId];
  client.query(SQL,values)
    .then(result => {
      console.log('here is the user from SQL',result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {console.log(err)});
}



function createUser(req, res) {
  const newUser = new User({
    token: user_token,
    github_username: user_data.login,
    github_id: user_data.id,
    github_url: user_data.url,
    avatar_url: user_data.avatar_url,
    gravatar_url: user_data.gravatar_id
  });
  // console.log('XXXX this is the new user created', newUser);

  // save user to sql
  // let { token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined } = newUser;
  let SQL = 'INSERT INTO users (token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;';
  let values = [newUser.token, newUser.experience_lvl, newUser.position, newUser.github_username, newUser.github_id, newUser.github_url, newUser.avatar_url, newUser.gravatar_url, newUser.last_login, newUser.is_superuser, newUser.username, newUser.first_name, newUser.last_name, newUser.email, newUser.is_active, newUser.date_joined];

  // console.log("the query", SQL);
  client.query(SQL, values)
    .then(result => console.log('XXXX got in sql saving', result))
    .catch(err => console.log(err));

  //   let SQL = 'INSERT INTO Users(token, github_username, github_id, github_url) VALUES($1, $2, $3, $4) RETURNING id;';
  //   client.query(SQL, ['jdkla298435', 'leylali', 126732, 'leylagitu.com'])
  //     .then(result => console.log(result))
  //     .catch(err => console.log(err));

}

function userAuthentication(req, res){
  let user = checkUser(req, res);
  if(user !== undefined){
    return res.json(user.token);
  }else{
    createUser(req, res);
  }
}

// router.get("/logout", (req, res) => {
//   if (req.session) req.session = null;
//   res.redirect("/");
// });

module.exports = router;