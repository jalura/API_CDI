// Creamos las instancias de las dependencias para nuestra API

// importamos el archivo de configuracion para obtener las variables de ambiente
//const config = require('./config.js');
// importamos el archivo con las funciones de mostra TRACE de los servicios
const imprimeTRACE = require('./trace.js');

// importamos express
const servExpress = require('express');
// importamos mysql
const mySql = require('mysql');
// importamos body-parse
const bodyParser = require('body-parser');

// En caso de que se realice el Deployment se define el puerto
// establecemos por default que si lo corremos localmente se apor el puero 3050
//const PORT = process.env.PORT || 3050;
const PORT = process.env.PORT || 443;    //PORT LivePerson


// Creamos una instancia del servidor express
const app = servExpress();
// Importamos ejs (Gestor de Plantillas)
app.set('view engine', 'ejs');
// Se estable a true la configuraciòn de trust proxy
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const  nivelTRACE = '2';

console.log("Nivel de Trace: " + nivelTRACE);
console.log("Version: Se integran sub tipos de problematicas  v1");

//const  nivelTRACE = config.TRACE;
/*
console.log('=============================================================');
console.log('   VARIABLES DE AMBIENTE');
console.log('   ==========================================================');
console.log(`   NODE_ENV=${config.NODE_ENV}`);
console.log(`   HOST=${config.HOST}`);
console.log(`   PORT=${config.PORT}`);
console.log(`   DB_HOST=${config.DB_HOST}`);
console.log(`   DB_USER=${config.DB_USER}`);
console.log(`   DB_PASS=${config.DB_PASS}`);
console.log(`   DB_NAME=${config.DB_NAME}`);
console.log(`   TRACE=${config.TRACE}`);
console.log('   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
*/

// =====================================================================
// Creamos la conexion a la BBDD de acuerdo a las variables de ambiente
// =====================================================================
/*
const conexionBBDD = mySql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
});
*/


/*
const conexionBBDD = mySql.createPool({
    host: '10.100.8.43',
    user: 'INVAPLCHAT_USER',
    password: '$nv4plCh4tUs3r',
    database: 'SIABDD',
    port: 3306
})
*/


const conexionBBDD = mySql.createPool({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'be4c93595247c1',
    password: '55f78527',
    database: 'heroku_a4ac2dcd99be87f'
})


// =====================================================================
// Creamos la estructura del header de respuesta
// =====================================================================
let cadenaJSON = {
    status: false,
    code: 200,
    message: '',
    respuesta: ''
};

// =====================================================================
// End Point ... Raiz ... Test
// =====================================================================
app.get('/', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/', nivelTRACE);
    cadenaJSON = {
        status: true,
        code: 200,
        message: 'API IMSS_CDI v1.0 Jun-2021',
        respuesta: ''
    }
    imprimeTRACE.logOperacion('Desc: API Raiz', '', nivelTRACE);
    res.json(cadenaJSON);
    imprimeTRACE.logResultado('API IMSS_CDI v1.0 Jun-2021', nivelTRACE);
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                          U  S  U  A  R  I  O  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Valida matricula de usuario (Ruta: usuarioMat)
// =============================================================================
app.get('/usuarioMat/:id', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/usuarioMat/:id', nivelTRACE);
    const {id} = req.params;
    var sql = 'SELECT clte.CVE_USUARIO, clte.NOM_NOMBRE, clte.NOM_APELLIDOPATERNO, clte.NOM_APELLIDOMATERNO, ';
    sql = sql + 'clte.CVE_CORREO, clte.CVE_MATRICULA, ooad.CVE_OOAD, ooad.NOM_CORTO, ooad.NOM_OOAD, ';
    sql = sql + 'ooad.CVE_TIPO_OOAD FROM SIAT_USUARIO clte ';
    sql = sql + 'INNER JOIN SIAC_OOAD AS ooad ON clte.CVE_CORREO = ooad.CVE_CORREO_TITULAR ';
    sql = sql + `WHERE clte.CVE_MATRICULA = ${id} `;
    const descOperacion = 'Valida Matricula de usuario sea valido para Problematica (IMSS-CDI) : <' + id + '>';
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            if (resultado.length > 0) {
                cadenaJSON = {
                    status: true,
                    code: 200,
                    message: 'Informaciòn de Usuario Autorizado (IMSS-CDI)',
                    respuesta: resultado
                }
            } else {
                cadenaJSON = {
                    status: false,
                    code: 204,
                    message: 'No hay registros que cumplan las condiciones',
                    respuesta: {}
                }
            }
        }
        res.json(cadenaJSON);
        const cadenaRespuesta = "alida Usuario Autorizado. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });   
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                 T I P O S   D E   P R O B L E M A S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todos los tipos de problemas (Ruta: tipoProblematicas)
// =============================================================================
app.get('/tipoProblematicas', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/tipoProblematicas', nivelTRACE);
    const sql = 'SELECT * FROM SIAC_TIPO_PROBLEMATICA';
    imprimeTRACE.logOperacion('Desc: Catalogo Tipo de Problematicas (IMSS-CDI)', sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {

            if (resultado.length > 0) {
                cadenaJSON = {
                    status: true,
                    code: 200,
                    message: 'Catalogo Tipo de Problematicas (IMSS-CDI)',
                    respuesta: resultado
                }
            } else {
                cadenaJSON = {
                    status: false,
                    code: 501,
                    message: 'No hay datos',
                    respuesta: '{}'
                }
            }
        }
        res.json(cadenaJSON);
        const cadenaRespuesta = "Consulta Tipo de Problematicas. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//         S U B   T I P O   D E   P  R  O  B  L  E  M  A  T  I  C  A  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta los subTipos de Problematicas(Ruta: cdi/subTipoProblematicas)
// =============================================================================
app.get('/subTipoProblematicas/:id', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/subTipoProblematicas/:id', nivelTRACE);
    const {id} = peticion.params;
    const sql = `SELECT CVE_SUBTIPO_PROBLEMATICA, NOM_NOMBRE, DESC_SUBTIPO, CVE_TIPO_PROBLEMATICA FROM SIAC_SUBTIPO_PROBLEMATICA WHERE CVE_TIPO_PROBLEMATICA = ${id}`;
    const descOperacion = 'Problematicas por Tipo (IMSS-CDI) : <' + id + '>';
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            if (resultado.length > 0) {
                cadenaJSON = {
                    status: true,
                    code: 200,
                    message: 'Informaciòn de los subtipos de Problematicas asociadas a un tipo (IMSS-CDI)',
                    respuesta: resultado
                }
            } else {
                cadenaJSON = {
                    status: false,
                    code: 204,
                    message: 'No hay registros que cumplan las condiciones',
                    respuesta: {}
                }
            }
        }
        respuesta.json(cadenaJSON);
        const cadenaRespuesta = "Informaciòn de los subtipos de Problematicas asociadas a un tipo (IMSS-CDI). Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });        
});



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                 P  R  O  B  L  E  M  A  T  I  C  A  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta las Problematicas por Tipo (Ruta: cdi/problematicasTipo)
// =============================================================================
app.get('/problematicasTipo/:id', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/problematicasTipo/:id', nivelTRACE);
    const {id} = peticion.params;
    const sql = `SELECT CVE_PROBLEMATICA, NOM_NOMBRE, CVE_TIPO_PROBLEMATICA FROM SIAC_PROBLEMATICA WHERE CVE_TIPO_PROBLEMATICA = ${id}`;
    const descOperacion = 'Problematicas por Tipo (IMSS-CDI) : <' + id + '>';
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            if (resultado.length > 0) {
                cadenaJSON = {
                    status: true,
                    code: 200,
                    message: 'Informaciòn de la(s) Problematica(s) asociadas a un tipo (IMSS-CDI)',
                    respuesta: resultado
                }
            } else {
                cadenaJSON = {
                    status: false,
                    code: 204,
                    message: 'No hay registros que cumplan las condiciones',
                    respuesta: {}
                }
            }
        }
        respuesta.json(cadenaJSON);
        const cadenaRespuesta = "Informaciòn de la(s) Problematica(s) asociadas a un tipo (IMSS-CDI). Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });        
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//               O O A D    P  R  O  B  L  E  M  A  T  I  C  A
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta los ultimos 3 registros de una OOAD (Ruta: cdi/ooadRegistradas)
// =============================================================================
app.get('/ooadRegistradas/:id', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/ooadRegistradas/:id', nivelTRACE);
    const {id} = peticion.params;
    var sql = 'select op.CVE_OOAD_PROBLEMATICA, op.DES_OTRO, ss.NOM_NOMBRE STATUS, ';
    sql = sql + "sp.NOM_NOMBRE PROBLEMATICA_NOMBRE , sn.NOM_NOMBRE NIVEL, DATE_FORMAT(op.FEC_ALTA, '%Y-%m-%d') FEC_ALTA ";
    sql = sql + 'FROM  SIAC_OOAD_PROBLEMATICA op ';
    sql = sql + 'JOIN  SIAC_OOAD so USING(CVE_OOAD) ';
    sql = sql + 'JOIN  SIAC_PROBLEMATICA sp USING(CVE_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_STATUS_PROBLEMATICA ss USING(CVE_STATUS_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_NIVEL sn USING(CVE_NIVEL) ';
    sql = sql + `WHERE CVE_OOAD= ${id} `;
    sql = sql + 'ORDER BY op.CVE_OOAD_PROBLEMATICA DESC LIMIT 3'
    const descOperacion = '3 Ultimas Problematicas registradas por (IMSS-CDI) : <' + id + '>';
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            if (resultado.length > 0) {
                cadenaJSON = {
                    status: true,
                    code: 200,
                    message: 'Ultimos 3 OOAD Registrados (IMSS-CDI)',
                    respuesta: resultado
                }
            } else {
                cadenaJSON = {
                    status: false,
                    code: 204,
                    message: 'No hay registros que cumplan las condiciones',
                    respuesta: {}
                }
            }
        }
        respuesta.json(cadenaJSON);
        const cadenaRespuesta = "Consulta 3 ultimos OOAD registradas. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });    
});


// =============================================================================
// End Point. POST - Agrega una OOAD Problematica (Ruta: ooadProblematicas/add)
// =============================================================================
app.post('/ooadProblematicas/add', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/ooadProblematicas/add', nivelTRACE);
    // Creamos un objeto customer utilizando la dependecia body-parser
    const ooadProblematicaObj = {
        NOM_RESPONSABLE: req.body.nombre_responsable,
        DES_OTRO: req.body.descripcion,
        CVE_OOAD: req.body.clave_ooad, 
        CVE_PROBLEMATICA: req.body.clave_problematica, 
        CVE_NIVEL: req.body.clave_nivel, 
        FEC_EXPIRA: req.body.fecha_expira,
        FEC_ALTA: req.body.fecha_alta,
        FEC_ACTUALIZACION: req.body.fecha_actualizacion,
        FEC_BAJA: req.body.fecha_baja,
        CVE_STATUS_PROBLEMATICA: req.body.status
    }
    const sql = 'INSERT INTO SIAC_OOAD_PROBLEMATICA SET ?';
    const descOperacion = 'Alta de una Problematicas ( IMSS-CDI) ';
    const sqlDesc = sql + " JSON: " + JSON.stringify(ooadProblematicaObj, null, '-');
    imprimeTRACE.logOperacion(descOperacion, sqlDesc, nivelTRACE);
    conexionBBDD.query(sql, ooadProblematicaObj, error => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            cadenaJSON = {
                status: true,
                code: 201,
                message: 'OOAD Problematica creada!',
                respuesta: {}
            }
        }
        res.json(cadenaJSON);
        const cadenaRespuesta = "Problematica-ADD. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });    
});



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//         Alta REGISTRO  P  R  O  B  L  E  M  A  T  I  C  A
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. POST - Agrega una Registro a Problematica (Ruta: problematica/add)
// =============================================================================
app.post('/problematica/add', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/problematica/add', nivelTRACE);
    // Creamos un objeto customer utilizando la dependecia body-parser
    const ooadProblematicaObj = {
        NOM_NOMBRE: req.body.desc_problema,
        CVE_SUBTIPO_PROBLEMATICA: req.body.cve_subTipoProblematica, 
        FEC_EXPIRA: req.body.fecha_expira,
        FEC_ALTA: req.body.fecha_alta,
        FEC_ACTUALIZACION: req.body.fecha_actualizacion,
        FEC_BAJA: req.body.fecha_baja
    }
    const sql = 'INSERT INTO SIAC_PROBLEMATICA SET ?';
    const descOperacion = 'Alta Registro de problematica ( IMSS-CDI) ';
    const sqlDesc = sql + " JSON: " + JSON.stringify(ooadProblematicaObj, null, '-');
    imprimeTRACE.logOperacion(descOperacion, sqlDesc, nivelTRACE);
    conexionBBDD.query(sql, ooadProblematicaObj, (error, result) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            cadenaJSON = {
                status: true,
                code: 201,
                message: 'Registro de Problematica creada!',
                respuesta: result.insertId
            }
        }
        res.json(cadenaJSON);
        const cadenaRespuesta = "Problematica-ADD. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });    
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//         A G E N T E   a   A S I G N A R    C O N V E R S A C I O N
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Obtiene nombre de agente para signar conversaciòn (Ruta: nombreAgente/cveSubTipo)
// =============================================================================
app.get('/nombreAgente/:cveSubtipo', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/nombreAgente/:cveSubtipo', nivelTRACE);
    const {cveSubtipo} = peticion.params;
    const sql = `SELECT CVE_USUARIO FROM SIAT_USUARIO_SUBTIPO_PROBLEMATICA WHERE CVE_SUBTIPO_PROBLEMATICA = ${cveSubtipo}`;
    const descOperacion = 'Obtiene usuario para atender Sub Tipo Problematica (IMSS-CDI) : <' + cveSubtipo + '>';
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado) => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            if (resultado.length > 0) {
                var cveUsuario = resultado[0].CVE_USUARIO;
                const sql = `SELECT CVE_CORREO FROM SIAT_USUARIO WHERE CVE_USUARIO = ${cveUsuario} and IND_LIVEPERSON = 1`;
                const descOperacion = 'Obtiene correo usuario, para asociar agente (IMSS-CDI) : <' + cveUsuario + '>';
                imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
                conexionBBDD.query(sql, (error, resultado) => {
                    if (error) {
                        const codError = "ERROR | Codigo: " + error.code;
                        const msgError = "     Mensaje: " + error.message;
                        const errorResult = codError + msgError;
                        cadenaJSON = {
                            status: false,
                            code: 500,
                            message: errorResult,
                            respuesta: {}
                        }
                    } else {
                        if (resultado.length > 0) { 
                            var cveCorreo = resultado[0].CVE_CORREO;
                            // Regresa la posicion donde se encuentra @, -1 si no lo encuentra 
                            var numIndice = cveCorreo.indexOf("@");    
                            var nomAgente = cveCorreo.substring(0 , numIndice);
                            cadenaJSON = {
                                status: true,
                                code: 200,
                                message: 'Nombre Usuario para asignarlo como agente (IMSS-CDI)',
                                respuesta: nomAgente
                            }
                        } else {
                            cadenaJSON = {
                                status: false,
                                code: 204,
                                message: 'No hay registros que cumplan las condiciones',
                                respuesta: {}
                            }
                        }
                    }  
                    respuesta.json(cadenaJSON);
                    const cadenaRespuesta = "Informaciòn del usuario a ser asignado como Agente (IMSS-CDI). Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
                    imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
                });        

            } else {
                cadenaJSON = {
                    status: false,
                    code: 204,
                    message: 'No hay registros que cumplan las condiciones',
                    respuesta: {}
                }
                respuesta.json(cadenaJSON);
                const cadenaRespuesta = "Informaciòn del usuario a ser asignado como Agente (IMSS-CDI). Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
                imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            }
        }
    });        
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//         O O A D   B I T A C O R A   P  R  O  B  L  E  M  A  T  I  C  A
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. POST - Agrega una OOAD Bitacora Problematica (Ruta: ooadBitacora/add)
// =============================================================================
app.post('/ooadBitacora/add', ( req, res ) => {
    const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/ooadBitacora/add', nivelTRACE);
    // Creamos un objeto customer utilizando la dependecia body-parser

    
    const ooadBitacoraObj = {
        FEC_ALTA: req.body.fecha_alta,
        FEC_HORA: hora_alta,
        CVE_MATRICULA: req.body.cve_matricula,
        CVE_ESTATUS: req.body.status,
        CVE_SOLICITUD: req.body.solicitud,
        CVE_OOAD_PROBLEMATICA: req.body.idOOAD
    }
    const sql = 'INSERT INTO SIAT_BITACORA_PROBLEMATICA SET ?';
    const descOperacion = 'Alta de OOAD Bitacora Problematica ( IMSS-CDI) ';
    const sqlDesc = sql + " JSON: " + JSON.stringify(ooadBitacoraObj, null, '-');
    imprimeTRACE.logOperacion(descOperacion, sqlDesc, nivelTRACE);
    conexionBBDD.query(sql, ooadBitacoraObj, error => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            cadenaJSON = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }
        } else {
            cadenaJSON = {
                status: true,
                code: 201,
                message: 'OOAD Bitacora Problematica creada!',
                respuesta: {}
            }
        }
        res.json(cadenaJSON);
        const cadenaRespuesta = "OOAD Bitacora Problematica-ADD. Respuesta:  " + JSON.stringify(cadenaJSON, null, '-');
        imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
    });    
});



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                 P A N T A L L A S    W E B 
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
// CONSULTA DE OOADD PROBLEMATICAS
//////////////////////////////////////////////////
app.get('/consultaOOAD', (peticion, respuesta) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/consultaOOAD', nivelTRACE);
    var sql = 'select op.CVE_OOAD_PROBLEMATICA, op.NOM_RESPONSABLE, op.DES_OTRO, so.NOM_NOMBRE OOAD_NOMBRE, ss.NOM_NOMBRE STATUS, ';
    sql = sql + "sp.NOM_NOMBRE PROBLEMATICA_NOMBRE , sn.NOM_NOMBRE NIVEL, DATE_FORMAT(op.FEC_ALTA, '%Y-%m-%d') FEC_ALTA ";
    sql = sql + 'FROM  SIAC_OOAD_PROBLEMATICA op ';
    sql = sql + 'JOIN  SIAC_OOAD so USING(CVE_OOAD) ';
    sql = sql + 'JOIN  SIAC_PROBLEMATICA sp USING(CVE_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_STATUS_PROBLEMATICA ss USING(CVE_STATUS_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_NIVEL sn USING(CVE_NIVEL) ';
    sql = sql + 'ORDER BY op.CVE_OOAD_PROBLEMATICA DESC ';
    imprimeTRACE.logOperacion('Desc: OOAD Problematicas (IMSS-CDI) - Pantalla de consulta general', sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado)=>{
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            imprimeTRACE.logResultado(errorResult, nivelTRACE);
            respuesta.redirect('/consultaOOAD');
        }else{
            const cadenaRespuesta = "Consulta OOAD Problematicas (IMSS-CDI). Respuesta:  " + JSON.stringify(resultado, null, '-');
            imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            respuesta.render('index', {resultado:resultado});
        }
    });
});


//////////////////////////////////////////////////
// CONSULTA DE OOADD PROBLEMATICAS por TIPO DE PROBLEMATICA
//////////////////////////////////////////////////
app.get('/OOADtipoProblematica/:id', (peticion, respuesta) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/OOADtipoProblematica', nivelTRACE);
    const {id} = peticion.params;
    var sql = 'select op.CVE_OOAD_PROBLEMATICA, op.NOM_RESPONSABLE, op.DES_OTRO, so.NOM_NOMBRE OOAD_NOMBRE, ss.NOM_NOMBRE STATUS, ';
    sql = sql + "sp.NOM_NOMBRE PROBLEMATICA_NOMBRE , sp.CVE_TIPO_PROBLEMATICA, sn.NOM_NOMBRE NIVEL, DATE_FORMAT(op.FEC_ALTA, '%Y-%m-%d') FEC_ALTA ";
    sql = sql + 'FROM  SIAC_OOAD_PROBLEMATICA op ';
    sql = sql + 'JOIN  SIAC_OOAD so USING(CVE_OOAD) ';
    sql = sql + 'JOIN  SIAC_PROBLEMATICA sp USING(CVE_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_TIPO_PROBLEMATICA stp USING (CVE_TIPO_PROBLEMATICA)';
    sql = sql + 'JOIN  SIAC_STATUS_PROBLEMATICA ss USING(CVE_STATUS_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_NIVEL sn USING(CVE_NIVEL) ';
    sql = sql + 'WHERE stp.CVE_TIPO_PROBLEMATICA = ' + id + ' ';
    sql = sql + 'ORDER BY op.CVE_OOAD_PROBLEMATICA DESC ';
    imprimeTRACE.logOperacion('Desc: OOAD Problematicas por Tipo de Problematica(IMSS-CDI) - Pantalla de consulta', sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado)=>{
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            imprimeTRACE.logResultado(errorResult, nivelTRACE);
            respuesta.redirect('/consultaOOAD');
        }else{
            const cadenaRespuesta = "Consulta OOAD Problematicas por Tipo de Problematica(IMSS-CDI). Respuesta:  " + JSON.stringify(resultado, null, '-');
            imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            respuesta.render('index', {resultado:resultado});
        }
    });
});


//////////////////////////////////////////////////
// EDITA UNA OOADD PROBLEMATICAS
//////////////////////////////////////////////////
app.get('/editaOOAD/:id', (peticion, respuesta) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/editaOOAD/:id', nivelTRACE);
    const {id} = peticion.params;
    var sql = 'select op.CVE_OOAD_PROBLEMATICA, op.NOM_RESPONSABLE, op.DES_OTRO, so.NOM_NOMBRE OOAD_NOMBRE, ss.NOM_NOMBRE STATUS, ';
    sql = sql + "sp.NOM_NOMBRE PROBLEMATICA_NOMBRE , sn.NOM_NOMBRE NIVEL, DATE_FORMAT(op.FEC_ALTA, '%Y-%m-%d') FEC_ALTA ";
    sql = sql + 'FROM  SIAC_OOAD_PROBLEMATICA op ';
    sql = sql + 'JOIN  SIAC_OOAD so USING(CVE_OOAD) ';
    sql = sql + 'JOIN  SIAC_PROBLEMATICA sp USING(CVE_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_STATUS_PROBLEMATICA ss USING(CVE_STATUS_PROBLEMATICA) ';
    sql = sql + 'JOIN  SIAC_NIVEL sn USING(CVE_NIVEL) ';
    sql = sql + 'WHERE op.CVE_OOAD_PROBLEMATICA = ' + id;
    const descOperacion = 'OOAD Problematicas (IMSS-CDI) - Pantalla de consulta particular, clave:' + id;
    imprimeTRACE.logOperacion(descOperacion, sql, nivelTRACE);
    conexionBBDD.query(sql, (error, resultado)=>{
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            imprimeTRACE.logResultado(errorResult, nivelTRACE);            
            respuesta.redirect('/consultaOOAD');
        } else {
            const cadenaRespuesta = "Consulta OOAD Problematicas (IMSS-CDI). Respuesta:  " + JSON.stringify(resultado[0], null, '-');
            imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            respuesta.render('edit', {problema:resultado[0]});
        }
    });
});

// =============================================================================
// End Point. POST - Actuailiza un registro de OOAD Problematica (Ruta: cdi/actualizaOOAD)
// =============================================================================
app.post('/actualizaOOAD', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/actualizaOOAD', nivelTRACE);
    var fechaHoy;
    fechaHoy = new Date();
    fechaHoy = fechaHoy.getUTCFullYear() + '-' +
        ('00' + (fechaHoy.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + fechaHoy.getUTCDate()).slice(-2);
    var fecha_actualizacion = fechaHoy;
    const idOOAD = peticion.body.id;
    // Creamos un objeto customer utilizando la dependecia body-parser
    const ooadProblematicaObj = {
        DES_OTRO: peticion.body.DES_OTRO,
        CVE_STATUS_PROBLEMATICA: peticion.body.estado,
        CVE_NIVEL: peticion.body.nivel, 
        FEC_ACTUALIZACION: fecha_actualizacion
    }
    const sql = 'UPDATE SIAC_OOAD_PROBLEMATICA SET ? WHERE CVE_OOAD_PROBLEMATICA = ?';
    const descOperacion = 'Actualizacion de una Problematicas (IMSS-CDI)  id: ' + idOOAD;
    const sqlDesc = sql + " JSON: " + JSON.stringify(ooadProblematicaObj, null, '-');
    imprimeTRACE.logOperacion(descOperacion, sqlDesc, nivelTRACE);
    conexionBBDD.query(sql, [ooadProblematicaObj, idOOAD], error => {
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            imprimeTRACE.logResultado(errorResult, nivelTRACE);            
            respuesta.redirect('/cdi/consultaOOAD');
        } else {
            const cadenaRespuesta = "Problematica-Actualizada (IMSS-CDI).";
            imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            respuesta.redirect('/cdi/consultaOOAD');
        }
    });
});
    



/*
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*/
// =============================================================================
// End Point. POST - Actuailiza un registro de OOAD Problematica (Ruta: cdi/actualizaOOAD)
// =============================================================================
app.get('/testOOAD', ( peticion, respuesta ) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/testOOAD', nivelTRACE);
    console.log("agentNote: "+peticion.query.agentNote);
    console.log("behavior: "+peticion.query.behavior);
    console.log("behaviorDescription: "+peticion.query.behaviorDescription);
    console.log("campaign: "+peticion.query.campaign);
    console.log("campaignDescription: "+peticion.query.campaignDescription);
    console.log("chatSkill: "+peticion.query.chatSkill);
    console.log("accountID: "+peticion.query.accountID);
    console.log("agentID: "+peticion.query.agentID);
    console.log("agentName: "+peticion.query.agentName);
    console.log("accountName: "+peticion.query.accountName);
    console.log("customerID: "+peticion.query.customerID);
    console.log("imei: "+peticion.query.imei);
    console.log("userName: "+peticion.query.userName);

    const arregloJSON = {
        agentNote: peticion.query.agentNote,
        behavior: peticion.query.behavior,
        behaviorDescription: peticion.query.behaviorDescription,
        campaign: peticion.query.campaign,
        campaignDescription: peticion.query.campaignDescription,
        chatSkill: peticion.query.chatSkill,
        accountID: peticion.query.accountID,
        agentID: peticion.query.agentID,
        agentName: peticion.agentName,
        accountName: peticion.query.accountName,
        customerID: peticion.query.customerID,
        imei: peticion.query.imei,
        userName: peticion.query.userName
    }
    cadenaJSON = {
        status: true,
        code: 200,
        message: 'Parametros enviados desde LivePersoon',
        respuesta: arregloJSON
    }

    respuesta.json(cadenaJSON);
    const cadenaRespuesta = "Test de envio de parametros desde ChatBot - Agente " + JSON.stringify(cadenaJSON, null, '-');
    imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
});




//////////////////////////////////////////////////
// CONSULTA DE OOADD PROBLEMATICAS dependiendo del SKILL del Agente
//////////////////////////////////////////////////
app.get('/OOADProblematicaSkill/:cveSkill', (peticion, respuesta) => {
    const ipAddress = peticion.header('x-forwarded-for') || peticion.connection.remoteAddress;
    imprimeTRACE.logRuta(ipAddress, '/OOADProblematicaSkill', nivelTRACE);
    const {cveSkill} = peticion.params;
    const cveCorreo = cveSkill + '@imss.gob.mx';   
    var sqlUsuario = 'select CVE_SUBTIPO_PROBLEMATICA from SIAT_USUARIO_SUBTIPO_PROBLEMATICA '
    sqlUsuario = sqlUsuario + `where CVE_USUARIO = (select CVE_USUARIO from siat_usuario where CVE_CORREO = '` + cveCorreo + `')`;
    imprimeTRACE.logOperacion('Desc: Obtiene Cve Usuario a partir de cve Skill(IMSS-CDI)', sqlUsuario, nivelTRACE);
    conexionBBDD.query(sqlUsuario, (error, resultado)=>{
        if (error) {
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            imprimeTRACE.logResultado(errorResult, nivelTRACE);
            cadenaJSON = {
                status: true,
                code: 204,
                message: 'Skill NO autorizado pa consultar (ERROR al accesar la BBDD <SIAT_USUARIO / SIAT_USUARIO_SUBTIPO_PROBLEMATICA>)',
                respuesta: {}
            }
            var resError = {};
            const cadenaRespuesta = "Autorizacion de Registros por Skill - Agente " + JSON.stringify(cadenaJSON, null, '-');
            imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
            respuesta.render('ooadskill', {resultado:resError});
        }else{
            if (resultado.length > 0) {
                var arregloSubTipo = [];
                var subTipos = "";

                for (var i = 0; i < resultado.length; i++){
                    var obj = resultado[i];
                    for (var key in obj){
                      if (i > 0) {
                          subTipos = subTipos + ", ";
                      } 
                      var value = obj[key];
                      arregloSubTipo.push(value);
                      subTipos = subTipos + value;
                      console.log(subTipos);
                    }
                  }
                  var nombreUsuario = "";
                  var sqlUsuario = `select NOM_NOMBRE, NOM_APELLIDOPATERNO,  NOM_APELLIDOMATERNO from SIAT_USUARIO where CVE_CORREO = '` + cveCorreo + `'`;
                  imprimeTRACE.logOperacion('Desc: Obtiene Nombre Usuario a partir de cve Skill(IMSS-CDI)', sqlUsuario, nivelTRACE);
                  conexionBBDD.query(sqlUsuario, (error, resultado)=>{
                    if (error) {
                        nombreUsuario = cveCorreo;
                    } else {
                        var nameUser = JSON.parse(resultado);
                        console.log(nameUser);
                        nombreUsuario = nameUser[0].NOM_NOMBRE + " " + nameUser[0].NOM_APELLIDOPATERNO + " " + nameUser[0].NOM_APELLIDOMATERNO; 
                        console.log("NOMBRE USUARIO: " + nombreUsuario);    
                    }
                  });
                  var sql = 'select op.CVE_OOAD_PROBLEMATICA, op.NOM_RESPONSABLE, op.DES_OTRO, so.NOM_NOMBRE OOAD_NOMBRE, ss.NOM_NOMBRE STATUS, ';
                  sql = sql + "sp.NOM_NOMBRE PROBLEMATICA_NOMBRE , sn.NOM_NOMBRE NIVEL, DATE_FORMAT(op.FEC_ALTA, '%Y-%m-%d') FEC_ALTA, "
                  sql = sql + "'" + cveSkill + "' as SKILL, '" + nombreUsuario + "' as USUARIO ";
                  sql = sql + 'FROM  SIAC_OOAD_PROBLEMATICA op ';
                  sql = sql + 'JOIN  SIAC_OOAD so USING(CVE_OOAD) ';
                  sql = sql + 'JOIN  SIAC_PROBLEMATICA sp USING(CVE_PROBLEMATICA) '; 
                  sql = sql + 'JOIN  SIAC_STATUS_PROBLEMATICA ss USING(CVE_STATUS_PROBLEMATICA) ';
                  sql = sql + 'JOIN  SIAC_NIVEL sn USING(CVE_NIVEL) ';
                  sql = sql + 'WHERE op.CVE_PROBLEMATICA in (select CVE_PROBLEMATICA from siac_problematica where CVE_SUBTIPO_PROBLEMATICA in (' + subTipos + ')) '; 
                  sql = sql + 'ORDER BY op.CVE_OOAD_PROBLEMATICA DESC  '; 
                  console.log(sql); 
                  console.log('**************************');
                  imprimeTRACE.logOperacion('Desc: OOAD Problematicas por SKILL a(IMSS-CDI)', sql, nivelTRACE);
                  conexionBBDD.query(sql, (error, resultado)=>{
                      if (error) {
                          const codError = "ERROR | Codigo: " + error.code;
                          const msgError = "     Mensaje: " + error.message;
                          const errorResult = codError + msgError;
                          imprimeTRACE.logResultado(errorResult, nivelTRACE);
                          cadenaJSON = {
                              status: true,
                              code: 204,
                              message: 'Skill NO autorizado pa consultar (ERROR al accesar la BBDD <SIAC_OOAD_PROBLEMATICA)',
                              respuesta: {}
                          }
                          var resError = {};
                          const cadenaRespuesta = "Autorizacion de Registros por Skill - Agente " + JSON.stringify(cadenaJSON, null, '-');
                          imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
                          respuesta.render('ooadskill', {resultado:resError});
                      }else{
                          const cadenaRespuesta = "Autorizacion de Registros por Skill - Agente . Respuesta:  " + JSON.stringify(resultado, null, '-');
                          imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
                          respuesta.render('ooadskill', {resultado:resultado});
                      }
                  });
            }else{
                cadenaJSON = {
                    status: true,
                    code: 204,
                    message: 'Skill NO autorizado para consultar (No existe en SIAT_USUARIO)',
                    respuesta: {}
                }
                const cadenaRespuesta = "Autorizacion de Registros por Skill - Agente " + JSON.stringify(cadenaJSON, null, '-');
                imprimeTRACE.logResultado(cadenaRespuesta, nivelTRACE);
                respuesta.render('ooadskill', {resultado:resultado});
            }
        }
    });
});



/*
*************************************************************************************
*************************************************************************************
*************************************************************************************
*************************************************************************************
*/



////////////////////////////////////////////////////////////////////////////////
// Llamamos a la funciòn listen, para verificar si hay eco en el puerto
////////////////////////////////////////////////////////////////////////////////
app.listen( PORT, () => console.log(`Server Running on Port ${PORT}`));
console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   

/*
app.listen( config.PORT, config.HOST, function () {
    console.log(`   App NodeJS-Express Running on http://${config.HOST}:${config.PORT}`);
    console.log('=============================================================');
});
*/