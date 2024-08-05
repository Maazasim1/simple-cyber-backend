//app.js
import express, { Express, Request, Response } from 'express';
import login_route from './routes/userLogin'
import register_route from './routes/userRegister'
import cors from 'cors';


const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
    return res.json({ message: "Allo! Catch-all route." });
})

app.use(cors())

app.use(express.json());
app.use('/api',login_route)
app.use('/api',register_route)



export default app;