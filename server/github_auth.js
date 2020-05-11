var express = require("express"),
  app = express();
const port = 5000;

const axios = require('axios');
const jwt = require('jsonwebtoken');
const pg = require('pg');


const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', (err)=> console.log(err));

var access_token_store = '';

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

require('dotenv').config();
var githubOAuth = require('github-oauth')({
  githubClient: process.env.GITHUB_KEY,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: 'http://localhost:' + port,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback',
  scope: 'user'
})

app.get("/auth/github", function (req, res) {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/auth/github/callback", function (req, res) {
  console.log("received callback");
  return githubOAuth.callback(req, res);
});

githubOAuth.on('error', function (err) {
  console.error('there was a login error', err)
})

//get access_token from github and then create a token by jwt
githubOAuth.on('token', function (token, serverResponse) {
  access_token_store = token;
  axios.get('https://api.github.com/user',{
    headers: {Authorization: 'Bearer ' + token.access_token}
  })
    .then(result => {
      console.log(JSON.stringify(result.data));
      const user_data = result.data;
      const new_token = jwt.sign(
        { userId: user_data.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' });
        // console.log(token);
      const newUser = new User({
        token: new_token,  
        github_username: user_data.login, 
        github_id: user_data.id, 
        github_url: user_data.url, 
        avatar_url: user_data.avatar_url, 
        gravatar_url: user_data.gravatar_id
      });
      console.log('this is the new user created',newUser);
      //save user to sql
      let { token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined} = newUser;
      let SQL = 'INSERT INTO Users(token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;';
      let values = [ token, experience_lvl, position, github_username, github_id, github_url, avatar_url, gravatar_url, last_login, is_superuser, username, first_name, last_name, email, is_active, date_joined];

      client.query(SQL, values)
        .then(result => console.log(result))
        .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
  serverResponse.end(JSON.stringify(token))
})


var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});

// token VARCHAR(255),
//   experience_lvl SMALLINT, null
//   position VARCHAR(255), null
//   github_username VARCHAR(255), user.login
//   github_id INTEGER, user.id
//   github_url VARCHAR(255), user.url
//   avatar_url VARCHAR(255), user.avatar_url
//   gravatar_url VARCHAR(255), user.gravatar_id
//   last_login TIMESTAMP, null
//   is_superuser BOOLEAN, false
//   username VARCHAR(150), null
//   first_name VARCHAR(30), null
//   last_name VARCHAR(150), null
//   email VARCHAR(254), null
//   is_active BOOLEAN, null
//   date_joined TIMESTAMPTZ null