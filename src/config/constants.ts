import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const POSTGRES_URI = process.env.POSTGRES_URI;
export const POSTGRES_PASS = process.env.POSTGRES_PASS;