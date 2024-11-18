import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

import { router } from './routers/index.router.js';
import docMiddleware from './libraries/middlewares/doc.middleware.js';

const corsOptions = {
  origin: process.env.FRONT_URL,
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static('app/static'));

docMiddleware(app);

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(router);

export default app;
