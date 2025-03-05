DROP DATABASE IF EXSITS creation_db;
CREATE DATABASE creation_db;

/c creation_db;

CREATE TABLE monster (
    monst_name VARCHAR(30),
    monst_type 
    head,
    torso,
    arm1,
    arm2,
    leg1,
    leg2,
    strength VARCHAR(30)
-- will these all need to be foregin keys? Would an ID or name be needed?
);
CREATE TABLE arm1 (
    id SERIAL PRIMARY KEY,
    arm1_name VARCHAR(30)
);
-- Is there a way to combine arm1 and 2 into the same table? Or rather, a user would just choose 'Arms', and then get two selections?
CREATE TABLE arm2 (
    id SERIAL PRIMARY KEY,
    arm2_name VARCHAR(30)
);
CREATE TABLE leg1 (
    id SERIAL PRIMARY KEY,
    leg1_name VARCHAR(30)
);
-- same question for the legs as the arms?
CREATE TABLE leg2 (
    id SERIAL PRIMARY KEY,
    leg2_name VARCHAR(30)
);
CREATE TABLE head (
    id SERIAL PRIMARY KEY
    head_name VARCHAR(30)
);
CREATE TABLE torso (
    id SERIAL PRIMARY KEY,
    torso_name VARCHAR(30)
);
CREATE TABLE strength (
    id SERIAL PRIMARY KEY
    strength_name VARCHAR(30)
);
CREATE TABLE monst_type (
    id SERIAL PRIMARY KEY
    monst_type_name VARCHAR(30)
);