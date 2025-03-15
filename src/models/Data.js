//Volumes -> Representam caixas,maços,sacos etc...
//Embalagem -> Essa propriedade indica de que forma o produto é comprado, ele pode ser comprado por "CX"(Caixa),SC(Saco),MC(Maço).
//unidadeVenda -> O produto pode ser vendido por KG ou UN.

export default class Data {
  static purchaseRecord(
    productCode,
    productName,
    volumes,
    valuePerVolume,
    unitsPerVolume,
    date
  ) {
    if(!this._isValidDate(date)) {
      throw new Error("[INVALID DATE] the date format is invalid.")
    }

    return {
      "Codigo": Number(productCode),
      "Produto": this._normalizeTexto(productName),
      "Volumes":Number(volumes),
      "Valor por Volume":Number(valuePerVolume),
      "Unidades por Volume": Number(unitsPerVolume),
      "Data": date}
  }

  static productRecord(code,productName,productPackage,volumes,unitMeasure,group) {


    return {
        "Codigo": Number(code),
        "Produto": this._normalizeTexto(productName),
        "Embalagem": productPackage.toUpperCase(),
        "Volumes": Number(volumes),
        "Unidade de Venda": unitMeasure.toUpperCase(),
        "Grupo": this._normalizeTexto(group)
      }
      };

  static reportItem(
    productCode,
    productName,
    volumes,
    valuePerVolume,
    unitsPerVolume,
    unitsTotal,
    unitValue,
    sellingPrice,
    markup,
    subtotal
  ) {
    return {
      "Codigo": Number(productCode),
      "Produto": this._normalizeTexto(productName),
      "Volumes": Number(volumes),
      "Valor por Volume": Number(valuePerVolume),
      "Unidades por Volume": Number(unitsPerVolume),
      "Total de Unidades": Number(unitsTotal),
      "Valor da Unidade": Number(unitValue),
      "Preco de Venda": Number(sellingPrice),
      "Markup": Number(markup),
      "Subtotal": Number(subtotal)
    }
  }

  static _normalizeTexto(str) {
    if(str) {
      str = str.normalize("NFD") // Remove acentos e diacríticos.
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase() 
      .trim();
     return str
    } else {
        return ""
      } 
  }
  
  static _isValidDate(date) {
    return !isNaN(new Date(date));
  }
  }
