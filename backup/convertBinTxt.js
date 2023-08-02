const fs = require('fs');

// Ruta del archivo binario de entrada y salida
const inputFile = 'ACF_27001.bin';


// Función para leer el archivo y devolver una Promise
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Uso de la función para leer el archivo y procesar los datos
readFileAsync(inputFile)
  .then(data => {
    const hexData = data.toString('hex');
    const cadenaConHeader = hexData    
   


    let index = 0; // Variable para mantener el índice de posición en la cadena.
    const resultados = []; // Array para almacenar los resultados.
    
    // Obtener los primeros 8 bytes y guardarlos en el array de salida con la clave "Header"
    const Header = cadenaConHeader.substr(0, 16);
    resultados.push({ Header });
    
    
    // Truncar los primeros 8 bytes de la variable cadena.
    const cadena = cadenaConHeader.substr(16);
    
    console.log("Cadena original:", cadena);
    while (index < cadena.length) {
      const posicion7y8 = cadena.substr(index + 6, 2); // Obtener los caracteres en la posición 7 y 8.
      const decimal = parseInt(posicion7y8, 16); // Convertir los caracteres hexadecimales a decimal.
    
    
      const porcionDeCadena = cadena.substr(index, decimal * 2); // Tomar los primeros 'decimal' bytes (cada byte son 2 caracteres en la cadena).
    
    
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



//     // convertir valores en nombres
//     const dataNombres = `3;T10
// 4;T11
// 5;T13
// 8;T55
// 9;T56
// 10;T63
// 11;T64
// 14;T101
// 15;T102
// 17;T142
// 18;DEF_INCL
// 20;priority
// 124;DEF_SN
// 125;DEF_SA
// 126;"CV 	"
// 127;INIT_AP
// 130;T61
// 131;T68
// 132;T93
// 133;T95
// 134;T96
// 136;T107
// 137;T51
// 138;T59
// 139;T5F
// 140;T5X
// 141;T6F
// 142;T6H
// 143;T6W
// 144;T6X
// 145;T6Y
// 146;T76
// 147;T7B
// 148;T81
// 149;T82
// 150;T84
// 151;T91
// 152;T94
// 153;T9E
// 154;T9F
// 155;T105
// 156;T106
// 157;T130
// 158;T133
// 159;T134
// 160;T144
// 161;T147
// 162;IMS_TIME_TC
// 163;IMS_FILTRO_AR
// 164;IMS_INC_STATI
// 165;IMS_PRES_RG
// 166;IMS_ISV_DEF
// 167;IMS_RGO_STATO_RIP
// 168;IMS_RGO_FILTRO_AR
// 169;IMS_RGO_GEN_EVE
// 170;IMS_RGO_TIPO_GEN
// 171;IMS_RGO_EVE_SPONT
// 172;IMS_RGI_STATO_RIP
// 173;IMS_RGI_FILTRO_AR
// 174;IMS_RGI_GEN_EVE
// 175;IMS_RGI_TIPO_GEN
// 176;IMS_RGI_EVE_SPONT
// 177;IMS_PRES_RVL
// 178;IMS_RVL_STATO_RIP
// 179;IMS_RVL_FILTRO_AR
// 180;IMS_RVL_GEN_EVE
// 181;IMS_RVL_TIPO_GEN
// 182;IMS_RVL_EVE_SPONT
// 281;DEF_ODM_AUTO
// 280;DEF_ODM`;

// const lines = dataNombres.split("\n");

// const jsonData = lines.map((line) => {
//   const [numero, nombre] = line.split(";");
//   return { enumerativo: parseInt(numero), nombre: nombre.trim() };
// });

// const nombres = (JSON.stringify(jsonData, null, 2));
// console.log(nombres);

// // fin convertir valores en nombres

const nombres = [
    {
      "enumerativo": 3,
      "nombre": "T10"
    },
    {
        "enumerativo": 128,
        "nombre": "RR"
      },
      {
        "enumerativo": 129,
        "nombre": "INT"
      },
      {
        "enumerativo": 135,
        "nombre": "T9I"
      },
      {
        "enumerativo": 197,
        "nombre": "RRICS_ISV_DEF"
      },
      {
        "enumerativo": 335,
        "nombre": "T9H"
      },
    {
      "enumerativo": 4,
      "nombre": "T11"
    },
    {
      "enumerativo": 5,
      "nombre": "T13"
    },
    {
      "enumerativo": 8,
      "nombre": "T55"
    },
    {
      "enumerativo": 9,
      "nombre": "T56"
    },
    {
      "enumerativo": 10,
      "nombre": "T63"
    },
    {
      "enumerativo": 11,
      "nombre": "T64"
    },
    {
      "enumerativo": 14,
      "nombre": "T101"
    },
    {
      "enumerativo": 15,
      "nombre": "T102"
    },
    {
      "enumerativo": 17,
      "nombre": "T142"
    },
    {
      "enumerativo": 18,
      "nombre": "DEF_INCL"
    },
    {
      "enumerativo": 20,
      "nombre": "priority"
    },
    {
      "enumerativo": 124,
      "nombre": "DEF_SN"
    },
    {
      "enumerativo": 125,
      "nombre": "DEF_SA"
    },
    {
      "enumerativo": 126,
      "nombre": "\"CV \t\""
    },
    {
      "enumerativo": 127,
      "nombre": "INIT_AP"
    },
    {
      "enumerativo": 130,
      "nombre": "T61"
    },
    {
      "enumerativo": 131,
      "nombre": "T68"
    },
    {
      "enumerativo": 132,
      "nombre": "T93"
    },
    {
      "enumerativo": 133,
      "nombre": "T95"
    },
    {
      "enumerativo": 134,
      "nombre": "T96"
    },
    {
      "enumerativo": 136,
      "nombre": "T107"
    },
    {
      "enumerativo": 137,
      "nombre": "T51"
    },
    {
      "enumerativo": 138,
      "nombre": "T59"
    },
    {
      "enumerativo": 139,
      "nombre": "T5F"
    },
    {
      "enumerativo": 140,
      "nombre": "T5X"
    },
    {
      "enumerativo": 141,
      "nombre": "T6F"
    },
    {
      "enumerativo": 142,
      "nombre": "T6H"
    },
    {
      "enumerativo": 143,
      "nombre": "T6W"
    },
    {
      "enumerativo": 144,
      "nombre": "T6X"
    },
    {
      "enumerativo": 145,
      "nombre": "T6Y"
    },
    {
      "enumerativo": 146,
      "nombre": "T76"
    },
    {
      "enumerativo": 147,
      "nombre": "T7B"
    },
    {
      "enumerativo": 148,
      "nombre": "T81"
    },
    {
      "enumerativo": 149,
      "nombre": "T82"
    },
    {
      "enumerativo": 150,
      "nombre": "T84"
    },
    {
      "enumerativo": 151,
      "nombre": "T91"
    },
    {
      "enumerativo": 152,
      "nombre": "T94"
    },
    {
      "enumerativo": 153,
      "nombre": "T9E"
    },
    {
      "enumerativo": 154,
      "nombre": "T9F"
    },
    {
      "enumerativo": 155,
      "nombre": "T105"
    },
    {
      "enumerativo": 156,
      "nombre": "T106"
    },
    {
      "enumerativo": 157,
      "nombre": "T130"
    },
    {
      "enumerativo": 158,
      "nombre": "T133"
    },
    {
      "enumerativo": 159,
      "nombre": "T134"
    },
    {
      "enumerativo": 160,
      "nombre": "T144"
    },
    {
      "enumerativo": 161,
      "nombre": "T147"
    },
    {
      "enumerativo": 162,
      "nombre": "IMS_TIME_TC"
    },
    {
      "enumerativo": 163,
      "nombre": "IMS_FILTRO_AR"
    },
    {
      "enumerativo": 164,
      "nombre": "IMS_INC_STATI"
    },
    {
      "enumerativo": 165,
      "nombre": "IMS_PRES_RG"
    },
    {
      "enumerativo": 166,
      "nombre": "IMS_ISV_DEF"
    },
    {
      "enumerativo": 167,
      "nombre": "IMS_RGO_STATO_RIP"
    },
    {
      "enumerativo": 168,
      "nombre": "IMS_RGO_FILTRO_AR"
    },
    {
      "enumerativo": 169,
      "nombre": "IMS_RGO_GEN_EVE"
    },
    {
      "enumerativo": 170,
      "nombre": "IMS_RGO_TIPO_GEN"
    },
    {
      "enumerativo": 171,
      "nombre": "IMS_RGO_EVE_SPONT"
    },
    {
      "enumerativo": 172,
      "nombre": "IMS_RGI_STATO_RIP"
    },
    {
      "enumerativo": 173,
      "nombre": "IMS_RGI_FILTRO_AR"
    },
    {
      "enumerativo": 174,
      "nombre": "IMS_RGI_GEN_EVE"
    },
    {
      "enumerativo": 175,
      "nombre": "IMS_RGI_TIPO_GEN"
    },
    {
      "enumerativo": 176,
      "nombre": "IMS_RGI_EVE_SPONT"
    },
    {
      "enumerativo": 177,
      "nombre": "IMS_PRES_RVL"
    },
    {
      "enumerativo": 178,
      "nombre": "IMS_RVL_STATO_RIP"
    },
    {
      "enumerativo": 179,
      "nombre": "IMS_RVL_FILTRO_AR"
    },
    {
      "enumerativo": 180,
      "nombre": "IMS_RVL_GEN_EVE"
    },
    {
      "enumerativo": 181,
      "nombre": "IMS_RVL_TIPO_GEN"
    },
    {
      "enumerativo": 182,
      "nombre": "IMS_RVL_EVE_SPONT"
    },
    {
      "enumerativo": 281,
      "nombre": "DEF_ODM_AUTO"
    },
    {
      "enumerativo": 280,
      "nombre": "DEF_ODM"
    }
  ]
  const nombresMap = {};
  nombres.forEach(obj => {
    nombresMap[obj.enumerativo] = obj;
  });
    
 // Actualizar el valor de "enumerativo" en el array "resultados" usando el objeto de mapeo
resultados.forEach(result => {
    const enumerativo = result.enumerativo;
    if (nombresMap[enumerativo]) {
      result.enumerativo = nombresMap[enumerativo].nombre;
      result.enumerativoNumber = enumerativo; // Agregar el número de enumerativo original como "enumerativoNumber"
    } else {
      console.warn(`No se encontró el valor enumerativo ${enumerativo} en el array de nombres.`);
    }
  });
  
  console.log("Resultados actualizados:", resultados);
  



  })
  .catch(error => {
    console.error('Error al leer el archivo:', error);
  });


