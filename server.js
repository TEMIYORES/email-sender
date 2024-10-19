import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";
import emailsender from "./routes/api/emailsender.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3400;

// Handle Options credentials check - use before CORS!
// and fetch cookies credentials requirement'
app.use(credentials);
// Cors
app.use(cors(corsOptions));
// Built in middleware to handle urlencoded data
// in other words form-data;
// 'Content-Type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use("/api/send-email", emailsender);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
