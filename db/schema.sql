-- Corrected schema.sql
DROP DATABASE IF EXISTS creation_db;
CREATE DATABASE creation_db;

\c creation_db;

-- Monster Types Table
CREATE TABLE monster_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Cards Table (Monster Parts)
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    monster_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) REFERENCES monster_types(name),
    part VARCHAR(10) CHECK (part IN ('Head', 'Body', 'Legs')) NOT NULL,
    speed INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    health INT NOT NULL,
    rarity VARCHAR(20) CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary', 'Mythical')) NOT NULL
);

-- Rarity Distribution Table
CREATE TABLE rarity_distribution (
    rarity VARCHAR(20) PRIMARY KEY,
    probability FLOAT NOT NULL
);

-- Type Effectiveness Table
CREATE TABLE effectiveness_chart (
    id SERIAL PRIMARY KEY,
    attacker VARCHAR(50) REFERENCES monster_types(name),
    defender VARCHAR(50) REFERENCES monster_types(name),
    multiplier FLOAT NOT NULL
);