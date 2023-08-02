const cadenaConHeader = "0100000000003b00190101050212000105017c000105007d000105017e000105007f0001050080000105008100010500030001081405000005000108803801008c00010800000000970001083075000089000108f4010000080001080a00000009000108c800000082000108b88800000a0001080a0000000b000108c8000000830001088813000084000108701101008500010870110100860001087011010087000108701101004f010108f40100000e00010870110100880001088038010004000108b00400008a000108307500008b0001080a0000008e000108960000008f000108f4010000900001080a000000910001080a00000092000108d007000093000108d0070000940001088813000095000108a86100009600010896000000980001088813000099000108d00700009a000108580200000f00010800badb009b000108e03229009c00010800badb001100010888130000a000010888130000a1000108a0bb0d008d000108320000009d000108e80300009e000108140000009f00010832000000c5000105001901000500190102050019010305001901040500190105050019010605001901070500ffbb";
let index = 0; // Variable para mantener el índice de posición en la cadena.
const resultados = []; // Array para almacenar los resultados.

// Obtener los primeros 8 bytes y guardarlos en el array de salida con la clave "Header"
const Header = cadenaConHeader.substr(0, 16);
resultados.push({ Header });


// Truncar los primeros 8 bytes de la variable cadena.
const cadena = cadenaConHeader.substr(16);


while (index < cadena.length) {
  const posicion7y8 = cadena.substr(index + 6, 2); // Obtener los caracteres en la posición 7 y 8.
  const decimal = parseInt(posicion7y8, 16); // Convertir los caracteres hexadecimales a decimal.

  console.log("Cadena original:", cadena);
  console.log("Caracteres en la posición 7 y 8:", posicion7y8);
  console.log("Valor decimal:", decimal);

  const porcionDeCadena = cadena.substr(index, decimal * 2); // Tomar los primeros 'decimal' bytes (cada byte son 2 caracteres en la cadena).

  console.log("Porción de la cadena:", porcionDeCadena);

  // Separar la porción de la cadena en cuatro partes
  const parte1 = porcionDeCadena.substr(0, 4); // Primeros 4 caracteres (2 bytes).
  const parte2 = porcionDeCadena.substr(4, 2); // Siguiente 2 caracteres (1 byte).
  const parte3 = porcionDeCadena.substr(6, 2); // Siguiente 2 caracteres (1 byte);
  let parte4;

  // Determinar cuántos bytes tomar para la parte 4
  if (decimal === 5) {
    parte4 = porcionDeCadena.substr(8, 2); // Últimos 2 caracteres (1 byte).
  } else if (decimal === 8) {
    parte4 = porcionDeCadena.substr(8, 8); // Últimos 8 caracteres (4 bytes).
  } else if (decimal === 6) {
    parte4 = porcionDeCadena.substr(8, 4); // Últimos 4 caracteres (2 bytes).
  } else {
    console.error("Valor decimal no válido. No se puede determinar la parte 4.");
    break;
  }

  // Convertir cada parte a decimal y aplicar las inversiones necesarias
  const enumerativo = parseInt(parte1.substr(2, 2) + parte1.substr(0, 2), 16);
  const OdM = parseInt(parte2, 16);
  const Dimension = parseInt(parte3, 16);

  // Invertir parte 4 según su longitud antes de convertirla a decimal
  if (decimal === 5) {
    parte4 = parte4; // No es necesario invertir, ya que es un byte.
  } else if (decimal === 8) {
    parte4 = parte4; // No es necesario invertir, ya que es un dword (4 bytes).
  } else if (decimal === 6) {
    parte4 = parte4.substr(2, 2) + parte4.substr(0, 2); // Invertir el word (2 bytes).
  }
  const byteGroups = parte4.match(/.{1,2}/g) || [];
  const reversedGroups = byteGroups.reverse();
  const resultadoSinComas = reversedGroups.join("");
  const valore = parseInt(resultadoSinComas, 16);

  console.log("Enumerativo:", enumerativo);
  console.log("OdM:", OdM);
  console.log("Dimension:", Dimension);
  console.log("Valore:", valore);

  // Guardar los resultados en el array
  resultados.push({
    enumerativo,
    OdM,
    Dimension,
    valore,
  });

  // Avanzar al siguiente conjunto de bytes
  index += decimal * 2;
}

console.log("Resultados:", resultados);
