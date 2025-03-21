import "dotenv/config"; // Correct way to load environment variables in ES Modules
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from a .env file

const DB_URL = process.env.DB_URL;

let sequelize;

// for production db (render)
if (DB_URL) {
    sequelize = new Sequelize(DB_URL, {
        dialect: "postgres",
        logging: false, // Prevents excessive logging
    });

    // for local db connection
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: "postgres",
            port: process.env.DB_PORT,
            logging: false, // Prevents excessive logging
        }
    );

    console.log("DB_USER:", process.env.DB_USER);
    console.log(
        "DB_PASSWORD:",
        process.env.DB_PASSWORD ? "*****" : "Not Found!"
    );
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_PORT:", process.env.DB_PORT);
    console.log("DB_NAME:", process.env.DB_NAME);
}

export default sequelize; // Use `export default` instead of `module.exports`

