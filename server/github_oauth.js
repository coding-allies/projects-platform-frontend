const fetch = require('node-fetch');
const cookieSession = require('cookie-session');
const { URLSearchParams } = require('url');
const express = require('express');
const axios = require('axios');
const url = require('url');

const router = express.Router();

require('dotenv').config();

const client_id = process.env.GITHUB_KEY;
const client_secret = process.env.GITHUB_SECRET;

router.get("/", (req, res) => {
  res.send("Hello GitHub auth");
});

router.get("/auth/github", (req, res) => {
  // const redirect_uri = "http://localhost:5000/auth/github/callback";
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
  // res.redirect('/');

  let user = await fetchGitHubUser(access_token)
    .then(user => {
      console.log('this is user within user', user);
      if (user) {
        console.log('this is the req from call back');
        req.session.access_token = access_token;
        req.session.githubId = user.id;
        res.redirect("/admin");
      
      } else {
        res.send("Login did not succeed!");
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
  //  req.session.access_token = access_token;
  //  req.session.githubId = user.id;
  await console.log(request);
  return await request.json();
}



router.get("/admin", async (req, res) => {
  // if (req.session && req.session.githubId === 1126497) {
  //   res.send("Hello Kevin <pre>" + JSON.stringify(req.session, null, 2));
  //   // Possible use "fetchGitHubUser" with the access_token
  // } else {
  //   res.redirect("/auth/github");
  // }
  res.send('here is admin with user')
  console.log('this is the req session from /admin');
});

// router.get("/logout", (req, res) => {
//   if (req.session) req.session = null;
//   res.redirect("/");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
module.exports = router;