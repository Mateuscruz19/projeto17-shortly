import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import Auth from "./routes/auth.route.js"
import Urls from "./routes/urls.routes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(Auth);
app.use(Urls)

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));