DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  github_url VARCHAR(255),
  description TEXT,
  looking_for TEXT,
  created TIMESTAMPTZ,
  updated TIMESTAMPTZ,
  lead_id INTEGER,
  contributors TEXT,
  tags TEXT
);

CREATE TABLE Users
(
  id SERIAL PRIMARY KEY,
  token VARCHAR(255),
  experience_lvl SMALLINT,
  position VARCHAR(255),
  github_username VARCHAR(255),
  github_id INTEGER,
  github_url VARCHAR(255),
  avatar_url VARCHAR(255),
  gravatar_url VARCHAR(255),
  last_login TIMESTAMP,
  is_superuser BOOLEAN,
  username VARCHAR(150),
  first_name VARCHAR(30),
  last_name VARCHAR(150),
  email VARCHAR(254),
  is_active BOOLEAN,
  date_joined TIMESTAMPTZ
);

-- CREATE TABLE Users(
--   id SERIAL PRIMARY KEY,
--   token VARCHAR(255),
--   github_username VARCHAR(255),
--   github_id INTEGER,
--   github_url VARCHAR(255)
-- );
