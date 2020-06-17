const express = require('express');
const cors = require('cors');
const pg = require('pg');
// const session = require('express-session');

// const oauthRoutes = require('./github_auth');
const oauthRoutes = require('./github_oauth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', (err)=> console.log(err));

app.use(cors());
app.use(express.json());

// app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use(oauthRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

