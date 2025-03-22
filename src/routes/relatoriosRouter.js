import express from "express";
import cors from 'cors';
import { configDotenv } from "dotenv";
import { getReport,getReportFromDate,exportReportXLSX } from "../controllers/relatoriosController.js";

configDotenv();
const relatoriosRouter = express.Router();

relatoriosRouter.get('/api/get-report',getReport);

relatoriosRouter.get('/api/get-report-from-date',cors({origin:process.env.URL}),getReportFromDate);

relatoriosRouter.get('/api/download-report-xlsx', exportReportXLSX);

export default relatoriosRouter;