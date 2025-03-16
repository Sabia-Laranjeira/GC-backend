import { dirname } from "path";
import GerenciadorDados from "./GerenciadorDados.js"
import Data from "../models/Data.js";
import { writeFileSync } from "fs";

import * as XLSX from "xlsx";
import * as fs from "fs";

XLSX.set_fs(fs);

import { Readable } from "stream"
XLSX.stream.set_readable(Readable);

import * as cpexcel from "xlsx/dist/cpexcel.full.mjs";
XLSX.set_cptable(cpexcel);

export default class ReportHandler {
  constructor(path,archiveRoot) {
    this.root = new GerenciadorDados(`${path}`,`${archiveRoot}`);
  }
  #productsRecords = new GerenciadorDados("./src/data/cadastros/","produtos.json");
  #purchaseRecords = new GerenciadorDados("./src/data/relatorios/","historicoCompras.json");
  getReports() {
    const rootData = this.root.read();
    if(rootData.length) {
      return rootData;
    } else {
      return 0
    }
  }

  getReportsByDate(date) {
    const reports = this.root.readAllWhere("Data",date);
    if(!reports) {
      return 0;
    }
    return reports;
  } 

  createReport(date) {
    const report = {"Data": date, "Relatorio": []};
    if(!this.root.readAllWhere("Data",date)) {
      this.root.update([report]);
    }
    const purchasesOnDate = this.#purchaseRecords.readAllWhere("Data",`${date}`);


    let unitsTotal = null;
    let unitValue = null;
    let sellingPrice = null;
    let subtotal = null;

    purchasesOnDate.forEach(purchase => { 
      const product = this.#productsRecords.readAllWhere("Codigo",purchase["Codigo"])
      if(!product[0]) {
        return
      }

      unitsTotal = purchase["Volumes"] * purchase["Unidades por Volume"];
      unitValue = purchase["Valor por Volume"]/purchase["Unidades por Volume"];
      sellingPrice = unitValue * product[0]["Markup"] + unitValue;
      subtotal = purchase["Volumes"] * purchase["Valor por Volume"];

      const item = Data.reportItem(
        purchase["Codigo"],
        purchase["Produto"],
        purchase["Volumes"],
        purchase["Valor por Volume"],
        purchase["Unidades por Volume"],
        unitsTotal,
        unitValue.toFixed(2),
        sellingPrice.toFixed(2),
        product[0]["Markup"],
        subtotal
      ) 

      report["Relatorio"].push(item);
    });

    this.root.updateOne("Data",date,"Relatorio",report["Relatorio"]);
    return report;
  }

  createXlsxFileReport(date) {
    const purchasesOnDate = this.root.readAllWhere("Data",`${date}`)[0];
    if(!purchasesOnDate){
      throw new Error(`[NOT FOUND]`);
    }
    const formattedDate = this._formatDate(date);

    const worksheet = XLSX.utils.json_to_sheet(purchasesOnDate["Relatorio"]);
    const workbook = XLSX.utils.book_new(worksheet,`Relatório Compra ${formattedDate}`);
    const buf = XLSX.write(workbook,{type:"buffer",bookType:"xlsx"});
    
    writeFileSync("./src/data/relatorios/xlsx/relatorio.xlsx",buf);
  }

  //This function format a date to DD/MM/YY
  _formatDate(date) {
    const dateArray = date.split('-')
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }
}