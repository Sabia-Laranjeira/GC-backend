export function validarTexto(texto, campo = "campo") {
  if (!texto || typeof texto !== "string") {
    throw new Error(`O ${campo} deve ser uma string válida.`);
  }
  return texto.trim();
}

export function validarNumero(valor, campo = "campo") {
  if (isNaN(valor) || valor <= 0) {
    throw new Error(`O ${campo} deve ser um número positivo.`);
  }
  return Number(valor);
}

export function validarData(data) {
  if (!Date.parse(data)) {
    throw new Error("A data fornecida é inválida.");
  }
  return new Date(data);
}
