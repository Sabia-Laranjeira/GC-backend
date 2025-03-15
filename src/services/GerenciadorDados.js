import { writeFileSync, readFileSync, existsSync} from 'fs'
import isNumber from '../utils/isNumber.js';


export default class GerenciadorDados {
  constructor(caminho,arquivoRaiz) {
    this.caminho = caminho;
    this.raiz = arquivoRaiz;
    this.encoding = 'utf-8';
    
    if(!existsSync(this.caminho + this.raiz)) {
      console.log(this.caminho + this.raiz)
      this._createEmptyArchive();
    }
  }
  
  _createEmptyArchive() {
    writeFileSync(this.caminho + this.raiz, "[]", this.encoding);
  }

  overWrite(conteudo) {
    try {
      writeFileSync(this.caminho + this.raiz,JSON.stringify(conteudo),this.encoding);
    } catch(error) {
      console.error(error);
    }
  }

  read() {
    try {
      return JSON.parse(readFileSync(this.caminho+this.raiz,this.encoding));   
    } catch (error) {
      console.error("Erro ao tentar ler o arquivo!");
      return [];
    }
  }

  readOneByName(name) {
    const dados = this.read();
    const registro = dados.find(obj => obj["Nome"] === name)
    if(!registro) {
        throw new Error(`[NOT FOUND] ${name} não encontrado em ${this.raiz}`)
      }
    return registro;
  }

  readOneWhere(key,value) {
    const data = this.read();
    const dataFound = data.filter(obj => obj[`${key}`] === value);
    return dataFound[0];
  }

  readAllWhere(key,value) {
    let dados = this.read();
    let dadosEncontrados = null;

    if(isNumber(value)) {
      dadosEncontrados = dados.filter(dado => dado[`${key}`] === Number(value));
      if(dadosEncontrados.length === 0) {
        return 0
      }
      return dadosEncontrados;
    }

    dadosEncontrados = dados.filter(dado => dado[`${key}`].indexOf(value) === 0);
    if(dadosEncontrados.length === 0) {
      return 0
    }
    return dadosEncontrados;
  }

  update(novoConteudo) {
    if(!(novoConteudo instanceof Array)) {
      throw new Error("[NOT ARRAY] A função 'update' opera em um Array ")
    }
    const dados = this.read();
    const dadosAtualizados = [...dados,...novoConteudo];
    this.overWrite(dadosAtualizados);

  }

  updateOne(indentifierKey,indentifierValue,key,newValue){
    const data = this.read();
    const record = data.find(obj => obj[`${indentifierKey}`] === indentifierValue);
    if(!record) {
      return 0;
    }
    record[key] = newValue;
    this.overWrite(data);
    return record;
  }

  delete(){
    this._createEmptyArchive();
  }
  
  deleteOne(produto) {
    const dados = this.read();
    const indiceObj = dados.findIndex(obj => obj["Produto"] === produto);
    if(indiceObj === -1) {
      return 0;
    }
    const [removido] = dados.splice(indiceObj,1);
    this.overWrite(dados);
    return removido
  }
}