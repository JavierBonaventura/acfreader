const express = require('express');
const fs = require('fs');
const multer = require('multer');
const nombres = require('./nombres');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta para cargar la página con el botón de carga de archivos
app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/styles.css">
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
        </head>
        <body>
        <div class="recuadro">
          <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <button type="submit">Cargar Archivo</button>
          </form>
          <div>
        </body>
      </html>
    `);
  });

// Ruta para procesar el archivo cargado y mostrar el contenido
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  readFileAsync(file.path)
    .then(data => {
      const hexData = data.toString('hex');
      const cadenaConHeader = hexData;

     

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

// Filtramos el elemento con la clave "Header"
const header = resultados.find(resultado => resultado.Header);

// Filtramos los elementos sin la clave "Header"
const registros = resultados.filter(resultado => !resultado.Header);

res.send(`
<head>
<link rel="stylesheet" type="text/css" href="/styles.css">
<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>

  <h1 style="margin-top: -5%" >File ACF translated:</h1>
  <p>Header: ${header.Header}</p>
  <table style="border-collapse: collapse; width: 100%; text-align: center;">
    <thead>
      <tr>
        <th style="border: 1px solid black;">Enumerativo</th>
        <th style="border: 1px solid black;">OdM</th>
        <th style="border: 1px solid black;">Dimension</th>
        <th style="border: 1px solid black;">Valore</th>
        <th style="border: 1px solid black;">EnumerativoNumber</th>
      </tr>
    </thead>
    <tbody>
      ${registros.map(resultado => `
        <tr>
          <td style="border: 1px solid black;">${resultado.enumerativo}</td>
          <td style="border: 1px solid black;">${resultado.OdM}</td>
          <td style="border: 1px solid black;">${resultado.Dimension}</td>
          <td style="border: 1px solid black;">${resultado.valore}</td>
          <td style="border: 1px solid black;">${resultado.enumerativoNumber}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`);



    })
    .catch(error => {
      console.error('Error al leer el archivo:', error);
      res.status(500).send('Error al leer el archivo.');
    });
});

// Función para leer el archivo y devolver una Promise
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación corriendo en http://localhost:${port}`);
});


module.exports = app;