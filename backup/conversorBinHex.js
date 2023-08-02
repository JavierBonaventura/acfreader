// const fs = require('fs');

// // Ruta del archivo binario de entrada y salida
// const inputFile = 'ACF_27001.bin';
// const hexFile = 'archivo_hex.txt';
// const outputBinFile = 'archivo_convertido.bin';

// // 1. Leer el archivo binario y convertirlo a código hexadecimal
// fs.readFile(inputFile, (err, data) => {
//   if (err) throw err;

//   const hexData = data.toString('hex');
//   console.log(hexData);
//   const nuevoHex = hexData+'ffbb'

//   // 2. Guardar el código hexadecimal en un nuevo archivo
//   fs.writeFile(hexFile, nuevoHex, (err) => {
//     if (err) throw err;
//     console.log('Archivo hexadecimal guardado correctamente.');

//     // 3. Leer el archivo hexadecimal y convertirlo de nuevo a binario
//     fs.readFile(hexFile, 'utf8', (err, hexContent) => {
//       if (err) throw err;

//       // Removemos cualquier caracter no hexadecimal para evitar problemas
//       hexContent = hexContent.replace(/[^0-9A-Fa-f]/g, '');

//       const binaryData = Buffer.from(hexContent, 'hex');

//       // 4. Guardar el contenido binario en otro archivo
//       fs.writeFile(outputBinFile, binaryData, (err) => {
//         if (err) throw err;
//         console.log('Archivo binario convertido y guardado correctamente.');
//       });
//     });
//   });
// });



// const header = '01 00 00 00 00 00 3b 00'
// const DEF_ODM_AUTO = 2 
// const DEF_INCL = 1 
// const DEF_SN = 0 
// const DEF_SA = 1 
// const CV = 0 
// const INIT_AP =	0 
// const RR =	0 
// const INT =	0 
// const T10 =	1300 
// const T13 =	80000 
// const T5X =	0 
// const T91 =	30000 
// const T51 =	500 
// const T55 =	10 
// const T56 =	200 
// const T61 =	35000 
// const T63 =	10 
// const T64 =	200 
// const T68 =	5000 
// const T93 =	70000 
// const T95 =	70000 
// const T96 =	70000 
// const T9I =	70000 
// const T9H =	500 
// const T101 =	70000 
// const T107 =	80000 
// const T11 =	1200 
// const T59 =	30000 
// const T5F =	10 
// const T6H =	150 
// const T6W =	500 
// const T6X =	10 
// const T6Y =	10 
// const T76 =	2000 
// const T7B =	2000 
// const T81 =	5000 
// const T82 =	25000 
// const T84 =	150 
// const T94 =	5000 
// const T9E =	2000 
// const T9F =	600 
// const T102 = 14400000 
// const T105 = 2700000 
// const T106 = 14400000 
// const T142 = 5000 
// const T144 = 5000 
// const T147 = 900000 
// const T6F = 50 
// const T130 = 1000 
// const T133 = 20 
// const T134 = 50 
// const ICS_ISV_DEF = 0 


// function decimalToHexadecimalFixedLength(decimalNumber) {
//   // Usamos el método toString() con base 16 para convertir el número decimal a hexadecimal
//   let hexString = decimalNumber.toString(16);

//   // Aseguramos que la cadena tenga 8 caracteres (agregando ceros a la izquierda si es necesario)
//   hexString = hexString.padStart(8, '0');

//   // Si el primer byte es 0, lo separamos del resto de la cadena
//   const firstByte = hexString.substring(0, 2);
//   const remainingBytes = hexString.substring(2);

//   // Concatenamos los bytes asegurándonos de que el primer byte tenga el 0 visible
//   const fixedLengthHexString = firstByte === '00' ? '0' + remainingBytes : hexString;
//   return fixedLengthHexString;
// }


// const decimalNumberWithZeroFirstByte = 120000;
// const hexadecimalNumberWithZeroFirstByte = decimalToHexadecimalFixedLength(decimalNumberWithZeroFirstByte);
// console.log(hexadecimalNumberWithZeroFirstByte); // Output: "00000010"





function decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
      hex = "0" + hex;
  }

  return hex;
}



function reverseHexBytes(hexString) {
  // Dividir la cadena hexadecimal en grupos de 2 caracteres
  const byteGroups = hexString.match(/.{1,2}/g) || [];

  // Invertir el orden de los grupos
  const reversedGroups = byteGroups.reverse();

  // Unir nuevamente los grupos en una cadena
  const reversedHexString = reversedGroups.join('');
console.log(reversedHexString);
  return reversedHexString;s
}

const hexadecimalNumberWithZeroFirstByte = decimalToHex(80000,8)
reverseHexBytes(hexadecimalNumberWithZeroFirstByte)
