import express from "express";
import { getReport,getReportFromDate,exportReportXLSX } from "../controllers/relatoriosController.js";

const relatoriosRouter = express.Router();

relatoriosRouter.get('/api/get-report',getReport);

relatoriosRouter.get('/api/get-report-from-date', getReportFromDate);

relatoriosRouter.get('/api/download-report-xlsx', exportReportXLSX);

export default relatoriosRouter;