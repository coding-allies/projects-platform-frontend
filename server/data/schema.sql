DROP TABLE IF EXISTS Users
CASCADE;
DROP TABLE IF EXISTS Projects;

-- TODO: remigrate the DB here
CREATE TABLE Users
(
  id SERIAL PRIMARY KEY,
  github_token VARCHAR(255) NOT NULL,
  auth_token VARCHAR(255) NOT NULL,
  experience_lvl SMALLINT CHECK (experience_lvl >= 0),
  position VARCHAR(255),
  company VARCHAR(255),
  github_username VARCHAR(255) NOT NULL,
  github_id INTEGER NOT NULL CHECK (github_id >= 0),
  github_url VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  gravatar_url VARCHAR(255) NOT NULL,
  last_login TIMESTAMP,
  is_superuser BOOLEAN NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(254) NOT NULL,
  is_active BOOLEAN NOT NULL,
  date_joined TIMESTAMPTZ NOT NULL,
  hireable BOOLEAN NOT NULL
);

CREATE TABLE Projects
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  github_url VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  looking_for TEXT NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  lead_id INTEGER REFERENCES Users(id)
  DEFERRABLE INITIALLY DEFERRED,
  contributors VARCHAR
  (100)
  [] NOT NULL,
  tags TEXT
);
