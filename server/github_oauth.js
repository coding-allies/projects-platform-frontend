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


function User(data) {
  this.token = data.token ? data.token : '';
  this.experience_lvl = data.experience_lvl ? data.experience_lvl : 0;
  this.position = data.position ? data.position : '';
  this.github_username = data.github_username ? data.github_username : '';
  this.github_id = data.github_id ? data.github_id : '';
  this.github_url = data.github_url ? data.github_url : '';
  this.avatar_url = data.avatar_url ? data.avatar_url : '';
  this.gravatar_url = data.gravatar_url ? data.gravatar_url : '';
  this.last_login = data.last_login ? data.last_login : null;
  this.is_superuser = data.is_superuser ? data.is_superuser : false;
  this.username = data.username ? data.username : '';
  this.first_name = data.first_name ? data.first_name : '';
  this.last_name = data.last_name ? data.last_name : '';
  this.email = data.email ? data.email : '';
  this.is_active = data.is_active ? data.is_active : true;
  this.date_joined = data.date_joined ? data.date_joined : null;
}


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
        console.log('this is the req from call back');
        userAuthentication(user, access_token);
      } else {
        res.status(400).send("Login did not succeed!");
      }
    })
    .catch(err => {console.log(`This is an error from fetching github user ${err}`)});

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

function userAuthentication(user_data, token){
  let user = checkUser(user_data.id);
  if(user !== undefined){
    console.log('xxxx have user within authentication', user.token);
    return res.json(user.token);
  }else{
    console.log('xxx get in creating new user');
    createUser(user_data,token);
  }
}


function createUser(user_data,user_token) {
  const newUser = new User({
    token: user_token,
    github_username: user_data.login,
    github_id: user_data.id,
    github_url: user_data.url,
    avatar_url: user_data.avatar_url,
    gravatar_url: user_data.gravatar_id
  });
  console.log('XXXX this is the new user created', newUser);

  // save user to sql
  let SQL = 'INSERT INTO users (token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;';
  let values = [newUser.token, newUser.experience_lvl, newUser.position, newUser.github_username, newUser.github_id, newUser.github_url, newUser.avatar_url, newUser.gravatar_url, newUser.last_login, newUser.is_superuser, newUser.username, newUser.first_name, newUser.last_name, newUser.email, newUser.is_active, newUser.date_joined];

  // console.log("the query", SQL);
  client.query(SQL, values)
    .then(result => console.log('XXXX got in sql saving', result))
    .catch(err => console.log(err));

}


// router.get("/logout", (req, res) => {
//   if (req.session) req.session = null;
//   res.redirect("/");
// });

module.exports = router;