import express from 'express';
import cors from "cors";
import { configDotenv } from 'dotenv';

import compraRouter from './routes/compraRouter.js';
import produtosRouter from './routes/produtosRouter.js';
import relatoriosRouter from './routes/relatoriosRouter.js';

configDotenv();
const app = express();
const url = process.env.URL

const allowedOrigins = ["https://gc-frontend-mu.vercel.app", "https://www.gc-frontend-mu.vercel.app"];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (!origin) {
        return res.status(403).json({ error: "Origem não identificada" });
    }

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        return next();
    } 
    
    return res.status(403).json({ error: "Acesso negado" });
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(compraRouter);
app.use(produtosRouter);
app.use(relatoriosRouter);

export default app;
