import express from 'express';
import cors from "cors";
import { configDotenv } from 'dotenv';

import compraRouter from './routes/compraRouter.js';
import produtosRouter from './routes/produtosRouter.js';
import relatoriosRouter from './routes/relatoriosRouter.js';

configDotenv();
const app = express();
const url = process.env.URL

const corsOption = {
    "origin": "https://gc-frontend-mu.vercel.app/"
  }

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(compraRouter);
app.use(produtosRouter);
app.use(relatoriosRouter);

export default app;