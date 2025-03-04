DROP DATABASE IF EXSITS creation_db;
CREATE DATABASE creation_db;

/c creation_db;

CREATE TABLE monster (
    head
    torso
    arm1
    arm2
    leg1
    leg2
    strength
-- will these all need to be foregin keys? Would an ID or name be needed?
);

CREATE TABLE arm1 (
    id SERIAL PRIMARY KEY
);
-- Is there a way to combine arm1 and 2 into the same table? Or rather, a user would just choose 'Arms', and then get two selections?
CREATE TABLE arm2 (
    id SERIAL PRIMARY KEY
);

CREATE TABLE leg1 (
    id SERIAL PRIMARY KEY
);

CREATE TABLE leg2 (
    id SERIAL PRIMARY KEY
);

CREATE TABLE head (
    id SERIAL PRIMARY KEY
)
CREATE TABLE torso (
    id SERIAL PRIMARY KEY
)
CREATE TABLE strength (
    id SERIAL PRIMARY KEY
)