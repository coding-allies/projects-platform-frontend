var express = require("express");
var router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const pg = require('pg');

require('dotenv').config();
  // app = express();
const port = process.env.PORT || 5000;

//connect to the database
const client = new pg.Client(process.env.DATABASE_URL);
console.log('xxx', process.env.DATABASE_URL);
client.connect();

client.on('error', (err) => console.log(err));

var access_token_store = '';
var user_data = null;
var user_token = null;
var githubCode = null;

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

var githubOAuth = require('github-oauth')({
  githubClient: process.env.GITHUB_KEY,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: 'http://localhost:' + port,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback',
  scope: 'user'
})

router.get("/auth/github", function (req, res) {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

router.get("/auth/github/callback", function (req, res) {
  console.log("received callback");
  githubCode = req.originalUrl.split('code')[1].split('=')[1].split('&')[0];
  // console.log('this is what we got from the callback', githubCode);
  // console.log('this is from the call back route',githubOAuth.callback(req, res));
  return githubOAuth.callback(req, res);
});

// var resultWithAccess = axios.post('https://github.com/login/oauth/access_token',
//                           {client_id: process.env.GITHUB_KEY,
//                            client_secret: process.env.GITHUB_SECRET,
//                            code: githubCode},
//                            accept = 'json')
//                            .then(result => {console.log(result.access_token)});

githubOAuth.on('error', function (err) {
  console.error('there was a login error', err)
})

//get access_token from github and then create a token by jwt
githubOAuth.on('token', function (token, serverResponse) {
  console.log("github token", token);
  access_token_store = token;
  axios.get('https://api.github.com/user', {
    headers: { Authorization: 'Bearer ' + token.access_token }
  })
    .then(result => {
      // console.log('here is the user data from github',JSON.stringify(result.data));
      user_data = result.data;
      user_token = jwt.sign(
        { userId: user_data.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' });
      // console.log(token);
    })
    .catch(err => console.log(err));
  serverResponse.end(JSON.stringify(token))
})

function checkUser(req, res){
  let SQL = 'SELECT * FROM Users WHERE github_id=$1;';
  let values = [user_data.id];
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


//check if user is in psql already
// app.get("/login", checkUser);
//save user data to backend
// app.get("/signup", createUser);
//check psql before creating a new user
router.get("/auth", userAuthentication)



// var server = app.listen(port, function () {
//   console.log('Listening on port %d', server.address().port);
// });


module.exports = router;

