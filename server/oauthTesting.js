const express = require('express');
const fetch = require('node-fetch');
// const cookieSession = require('cookie-session');

const app = express();

require('dotenv').config();


const client_id = process.env.GITHUB_KEY;
const client_secret = process.env.GITHUB_SECRET;
console.log({ client_id, client_secret });

app.get("/", (req, res) => {
  res.send("Hello GitHub auth");
});

app.get("/auth/github", (req, res) => {
  const redirect_uri = "http://localhost:5000/auth/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  );
});

async function getAccessToken(code, client_id, client_secret) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      "client_id":client_id,
      "client_secret":client_secret,
      "code":code
    }
  });
  const text = await res.text();
  console.log(text);
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

// async function fetchGitHubUser(token) {
//   const request = await fetch("https://api.github.com/user", {
//     headers: {
//       Authorization: "token " + token
//     }
//   });
//   return await request.json();
// }

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  console.log('this is the query code', code);
  const access_token = await getAccessToken({ code, client_id, client_secret });
  // const user = await fetchGitHubUser(access_token);
  // if (user) {
  //   req.session.access_token = access_token;
  //   req.session.githubId = user.id;
  //   res.redirect("/admin");
  // } else {
  //   res.send("Login did not succeed!");
  // }
  res.json({access_token});
});

// app.get("/admin", async (req, res) => {
//   if (req.session && req.session.githubId === 1126497) {
//     res.send("Hello Kevin <pre>" + JSON.stringify(req.session, null, 2));
//     // Possible use "fetchGitHubUser" with the access_token
//   } else {
//     res.redirect("/auth/github");
//   }
// });

// app.get("/logout", (req, res) => {
//   if (req.session) req.session = null;
//   res.redirect("/");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening on localhost:" + PORT));