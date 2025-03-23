import app from "./app.js";
import { configDotenv } from "dotenv";

configDotenv()
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});