DROP DATABASE IF EXISTS creation_db;
CREATE DATABASE creation_db;
ALTER TABLE head ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
ALTER TABLE monst_type ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
ALTER TABLE strength ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
ALTER TABLE arms ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
-- ALTER TABLE arm2 ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
ALTER TABLE legs ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
-- ALTER TABLE leg2 ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
ALTER TABLE torso ADD COLUMN speed INT, ADD COLUMN health INT, ADD COLUMN damage INT;
-- moved ALTER TABLE commands to schema file from seed file. Pretty sure it's supposed to go here?


/c creation_db;

CREATE TABLE monster (
    id SERIAL PRIMARY KEY, 
    monst_name VARCHAR(30),
    monst_type INTEGER NOT NULL 
        FOREIGN KEY (monst_type)
            REFERENCES monst_type(id),  -- Foreign key reference
    head INTEGER NOT NULL 
        FOREIGN KEY (head)    
            REFERENCES head(id),  
    torso INTEGER NOT NULL 
        FOREIGN KEY (torso)
            REFERENCES torso(id),  
    arm1 INTEGER NOT NULL 
        FOREIGN KEY (arms)
            REFERENCES arms(id),  
    arm2 INTEGER 
        FOREIGN KEY (arms)
            REFERENCES arms(id),  
    leg1 INTEGER NOT NULL 
        FOREIGN KEY (legs)
            REFERENCES legs(id),  
    leg2 INTEGER 
        FOREIGN KEY (legs)
            REFERENCES legs(id),  
    strength INTEGER NOT NULL 
        FOREIGN KEY (strength)
            REFERENCES strength(id)  
);

CREATE TABLE monst_type (
    id SERIAL PRIMARY KEY,
    monst_type_name VARCHAR(30)
);

CREATE TABLE strength (
    id SERIAL PRIMARY KEY,
    strength_name VARCHAR(30)
);

CREATE TABLE head (
    id SERIAL PRIMARY KEY,
    head_name VARCHAR(30)
);

CREATE TABLE torso (
    id SERIAL PRIMARY KEY,
    torso_name VARCHAR(30)
);

CREATE TABLE arms (
    id SERIAL PRIMARY KEY,
    arm_name VARCHAR(30),
    arm_position VARCHAR(10) CHECK (arm_position IN ('left', 'right'))  -- Indicates if it's left or right arm
);

CREATE TABLE legs (
    id SERIAL PRIMARY KEY,
    leg_name VARCHAR(30),
    leg_position VARCHAR(10) CHECK (leg_position IN ('left', 'right'))  -- Indicates if it's left or right leg
);

