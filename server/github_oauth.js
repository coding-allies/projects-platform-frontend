const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const cookieSession = require('cookie-session');

require('dotenv').config();

const client_id = process.env.GITHUB_KEY;
const client_secret = process.env.GITHUB_SECRET;

router.get("/login/github", (req, res) => {
  const redirect_uri = "http://localhost:5000/login/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  );
});

router.get("/login/github/callback", async (req, res) => {
  const code = req.query.code;
  const access_token = await getAccessToken({code, client_id, client_secret});
  const user = await fetchGithubUser(access_token); 
  console.log('here is the token and user',access_token, user);
});

async function getAccessToken({code, id, secret}){
  const req = await fetch("https://github.com/login/oauth/access_token",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id, secret, code
    })
  });
  const text = await req.text();
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

async function fetchGithubUser(token){
  const req = await fetch("https://api.github.com/user", {
    headers: {
      authorization: "token" + token
    }
  });
  return await req.json();
}


module.exports = router;

