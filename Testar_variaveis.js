import { configDotenv } from "dotenv";
configDotenv();
const url = process.env.URL;

console.log(url)