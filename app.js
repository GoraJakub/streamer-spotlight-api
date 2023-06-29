import express, { json, urlencoded } from 'express';
import streamersRouter from './routes/streamersRouter.js';
import errorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cookieParser())
app.use(cors())


//routes
app.use('/streamers', streamersRouter)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;

