function logRuta(ipAddress, ruta, nivelTRACE) {
    var fechaActual = Date().toLocaleString("en-US", {timeZone: "America/Monterrey"});
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>');   
    switch(nivelTRACE) {
        case '1':
            console.log(fechaActual + '  <> IP: ' + ipAddress);
            console.log(fechaActual + '  <> Ruta=> ' + ruta);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            break;

        case '2':
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(fechaActual + '  <> IP: ' + ipAddress);
            console.log(fechaActual + '  <> Ruta=> ' + ruta);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            break;
        default:
            console.log(fechaActual + ' --- Ruta=> ' + ruta);
      }
}

function logOperacion(descripcion, operacion, nivelTRACE) {
    var fechaActual = Date().toLocaleString("en-US", {timeZone: "America/Monterrey"});
    switch(nivelTRACE) {
        case '1':
            console.log(fechaActual + '  <>  ' + descripcion);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            break;
        case '2':
            console.log(fechaActual + '  <>  ' + descripcion);
            console.log(fechaActual + '  <>  ' + operacion);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            break;
        default:
            break;
      }
}

function logResultado(resultado, nivelTRACE) {
    var fechaActual = Date().toLocaleString("en-US", {timeZone: "America/Monterrey"});
    switch(nivelTRACE) {
        case '1':
            break;
        case '2':
            console.log(fechaActual + '  <>  ' + resultado);
            break;
        default:
            break;
      }
      console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
}

exports.logRuta=logRuta;
exports.logOperacion=logOperacion;
exports.logResultado=logResultado;