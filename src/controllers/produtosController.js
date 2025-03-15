import GerenciadorDados from "../services/GerenciadorDados.js";

const registroProdutos = new GerenciadorDados("./src/data/cadastros/","produtos.json");

export const getRegistroProdutos = (req,res) => {
  res.status(200).json(registroProdutos.read());
}

export const getProdutos = (req,res) => {
  try {
    const nomeRecebido = req.query.name;
    const produtoEncontrado = registroProdutos.readAllWhere("Nome",nomeRecebido);
    
    if(!produtoEncontrado) {
      throw new Error(`[NOT FOUND] o produto com o nome ${nomeRecebido} não foi encontrado. `)
    }
    res.status(200).json(produtoEncontrado);
  } catch(error) {
    console.error(error);
    res.status(404).json({error:error.message});
  }
}

export const getProductByCode = (req,res) => {
  try {
    const receivedCode = req.query.code;
    const productFound = registroProdutos.readAllWhere("Codigo",receivedCode);
    res.status(200).send(productFound);
  } catch (error) {
    console.error(error);
    res.status(404).json({error:"Produto não encontrado"});
  }
}

