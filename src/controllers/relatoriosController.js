import ReportHandler from "../services/ReportHandler.js";

const reportHandler = new ReportHandler("./src/data/relatorios/","relatoriosGerais.json");

export const getReport = (req,res) => {
  const reportsData = reportHandler.getReports();
  if(reportsData) {
    res.status(200).json(reportsData);
  } else {
    res.status(404).json({error:`[NOT FOUND] Could not find any report`});
  }
}

export const getReportFromDate = (req,res) => {
  const { date } = req.query;

  const report = reportHandler.root.readAllWhere("Data",date)[0];
  if(!report) {
     res.status(404).json({status:404,error:`[NOT FOUND] Could not find report on date ${date}`})
     return
   } 
  res.status(200).json({status:200,response:report});
}
export const exportReportXLSX = (req,res) => {
  try {
    const options = {
      root: "./src/data/relatorios/xlsx"
    }
    const {date} = req.query;

    reportHandler.createXlsxFileReport(date)
    const fileName = "relatorio.xlsx"
  
    res.status(200).sendFile(fileName,options, (err) => {
      if(err) {
        console.error(err);
        res.status(400)
      } else {
        console.log(`Sent: ${fileName}`)
      }
    });
  } catch (error) {
    console.error(error);
    switch(error.message) {
      case "[NOT FOUND]": 
        res.status(404).json({error: `Coundn't find any report on date ${date}`})
      default: 
        res.status(500).json({error: error.message})
    }
  }
}

