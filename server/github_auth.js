var express = require("express"),
  app = express(),
  config = require("./config.js")
const port = 5000;

var githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_KEY,
  githubSecret: config.GITHUB_SECRET,
  baseURL: 'http://localhost:' + port,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback'
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
  serverResponse.end(JSON.stringify(token))
})

var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});
