import express from 'express'
import { 
  getRegistroCompras, 
  postPurchaseReport, 
  overwritePurchaseRecord} from '../controllers/purchasesController.js'

const compraRouter = express.Router();

compraRouter.get('/api/purchase-records',getRegistroCompras);

compraRouter.post('/api/send-purchase-record', postPurchaseReport);

compraRouter.post('/api/overwrite-purchase-record', overwritePurchaseRecord);

export default compraRouter;