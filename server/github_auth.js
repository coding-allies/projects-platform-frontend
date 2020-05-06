var express = require("express"),
  app = express();
const port = 5000;

const axios = require('axios');

var access_token_store = '';

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

githubOAuth.on('token', function (token, serverResponse) {
  access_token_store = token;
  axios.get('https://api.github.com/user',{
    headers: {Authorization: 'Bearer ' + token.access_token}
  })
    .then(result => {
      console.log(JSON.stringify(result.data));
    })
    .catch(err => console.log(err));
  serverResponse.end(JSON.stringify(token))
})


var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});
