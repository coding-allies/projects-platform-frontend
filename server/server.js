const express = require('express');
const cors = require('cors');
const pg = require('pg');

const oauthRoutes = require('./github_auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', (err)=> console.log(err));

app.use(cors());
app.use(express.json());

app.use(oauthRoutes);

// app.get('/user', createUser);


// function createUser(req, res) {
//   let SQL = 'INSERT INTO Users(token, github_username, github_id, github_url) VALUES($1, $2, $3, $4) RETURNING id;';
//   client.query(SQL, ['jdkla298435', 'leylali', 126732, 'leylagitu.com'])
//     .then(result => console.log(result))
//     .catch(err => console.log(err));
// }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

