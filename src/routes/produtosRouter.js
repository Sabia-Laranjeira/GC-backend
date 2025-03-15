import express from 'express'
import { getRegistroProdutos,getProdutos,getProductByCode } from '../controllers/produtosController.js'

const produtosRouter = express.Router();

produtosRouter.get('/api/products',getRegistroProdutos);

produtosRouter.get('/api/get-products-by-name', getProdutos);

produtosRouter.get('/api/get-product-by-code', getProductByCode);

export default produtosRouter;