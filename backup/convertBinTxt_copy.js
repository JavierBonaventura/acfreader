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
   
  
  console.log("Resultados actualizados:", cadenaConHeader);
  



  })
  .catch(error => {
    console.error('Error al leer el archivo:', error);
  });


