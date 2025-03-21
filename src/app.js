import express from 'express';
import cors from "cors";
import { configDotenv } from 'dotenv';

import compraRouter from './routes/compraRouter.js';
import produtosRouter from './routes/produtosRouter.js';
import relatoriosRouter from './routes/relatoriosRouter.js';

configDotenv();
const app = express();
const url = process.env.URL
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", `${url}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors({
  origin: `${url}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}));

app.use(compraRouter);
app.use(produtosRouter);
app.use(relatoriosRouter);

export default app;