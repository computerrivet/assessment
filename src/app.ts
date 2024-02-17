import express, { Express, NextFunction, Request, Response } from "express";
import { replaceRefs } from "./lib";
import createError from 'http-errors';

const PORT = process.env.PORT || 8080;
const app = express();

// middleware
app.use(express.json());

// take arbitrary json and replace "dog" with "cat", (but not any strings containing dog)
app.post('/', function (req: Request, res: Response, next: NextFunction) {
    res.json(replaceRefs(req.body));
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.json({ message: 'error' });
});


app.listen(PORT, function () {
    console.log(`[SERVER] Server running on port: ${PORT} `);
});
