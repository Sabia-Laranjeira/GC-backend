import GerenciadorDados from "../services/GerenciadorDados.js";
import ReportHandler from "../services/ReportHandler.js";
import Data from "../models/Data.js";

const productsRecord = new GerenciadorDados("./src/data/cadastros/","produtos.json");
const purchasesRecord = new GerenciadorDados("./src/data/relatorios/","historicoCompras.json");
const reportHandler = new ReportHandler("./src/data/relatorios/","relatoriosGerais.json")

export const getRegistroCompras = (req,res) => {
  res.status(200).json(purchasesRecord.read());
}

export const postPurchaseReport = (req,res) => {
  try {
    const {
      date,productCode,
      productName,volumes,
      valuePerVolume,unitysPerVolume,
      markup, unityValue,
      sellingUnityPrice} = req.body;

    const purchaseRecord = Data.purchaseRecord(
      productCode,
      productName,
      volumes,
      valuePerVolume,
      unitysPerVolume,
      date);
    //Check if a product in this date already exist
    const products = purchasesRecord.readAllWhere("Codigo",productCode);

    if(products.length >= 1) {
      products.forEach(p => {
        if(p["Data"] === purchaseRecord["Data"]) {
          throw new Error("[ALREADY EXISTS]");      
        }
      });
    }
    
    //update product properties 
    productsRecord.updateOne("Codigo",purchaseRecord["Codigo"],"UnidadesPorVolume",Number(unitysPerVolume))
    productsRecord.updateOne("Codigo",purchaseRecord["Codigo"],"Markup",Number(markup));
    productsRecord.updateOne("Codigo",purchaseRecord["Codigo"],"Preco Venda",Number(sellingUnityPrice));
    productsRecord.updateOne("Codigo",purchaseRecord["Codigo"],"Codigo", Number(productCode));
    
    //update purchase records history.
    purchasesRecord.update([purchaseRecord]);
    const report = reportHandler.createReport(purchaseRecord["Data"]); 

    res.status(200).json({purchaseRecord,report});

  } catch (error) {
    switch(error.message) {
      case "[ALREADY EXISTS]":
        res.status(403).json({error: error.message});
        break
      default:
        console.error(error);
        res.status(500).json({error: "Something went wrong with the Server"});
    }
  }
}

export const overwritePurchaseRecord = (req,res) => {
  try {
    const {
      date,productCode,
      productName,volumes,
      valuePerVolume,unitysPerVolume} = req.body;

    const purchaseRecord = Data.purchaseRecord(
      productCode,
      productName,
      volumes,
      valuePerVolume,
      unitysPerVolume,
      date);

    const keysToOverwrite = ["Volumes","Valor por Volume","Unidades por Volume","Markup"]
    for(let key of keysToOverwrite) {
      purchasesRecord.updateOne("Data",purchaseRecord["Data"],key,purchaseRecord[`${key}`]);
    }

    //update purchase records history.
    const report = reportHandler.createReport(purchaseRecord["Data"]); 

    res.status(200).json({purchaseRecord, report})

  } catch (error) {
    res.status(500).json({error:error.message})
  }
}