import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { StreamChat } from "stream-chat";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});