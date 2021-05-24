// Creamos las instancias de las dependencias para nuestra API

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

app.use(bodyParser.json());

// Creamos la instancia de conexion a MySql para el IMSS via Google-Digitek
/*
const conexionBBDD = mySql.createPool({
    host: '10.100.8.42',
    user: 'INVAPLCHAT_USER',
    password: '$nv4plCh4tUs3r',
    database: 'SIABDD'
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
let respuesta = {
    status: false,
    code: 200,
    message: '',
    respuesta: '{}'
};

// =====================================================================
// End Point ... Raiz ... Test
// =====================================================================
app.get('/', ( req, res ) => {
    respuesta = {
        status: true,
        code: 200,
        message: 'Welcome to my API IMSS_CDI v1.1 Upd msg error 14:45',
        respuesta: '{}'
    }
    res.send(respuesta);
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                          U  S  U  A  R  I  O  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Valida matricula de usuario (Ruta: usuarioMatricula)
// =============================================================================
app.get('/usuarioMatricula/:id', ( req, res ) => {
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Valida Matricula de usuario (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT CVE_USUARIO, NOM_NOMBRE, NOM_APELLIDOPATERNO, NOM_APELLIDOMATERNO, CVE_CORREO FROM SIAT_USUARIO WHERE CVE_MATRICULA = ${id}`;

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        console.log(resultado);
        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn del Usuario (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'Informaciòn no válida',
                respuesta: '{}'
            }
        }
        console.log(respuesta);
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                     E  N  T  I  D  A  D  E  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todos la entidades (Ruta: entidades)
// =============================================================================
app.get('/entidades', ( req, res ) => {
    console.log('==========================================================================');
    console.log('Catalogo Entidades (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');

    const sql = 'SELECT * FROM SIAC_ENTIDAD';

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Catalogo Entidadess (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No hay datos',
                respuesta: '{}'
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//               U  N  I  D  A  D  E  S     1er   N  I  V  E  L
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta una unidad nivel 1 por Entidad (Ruta: unidadesEntidad)
// =============================================================================
app.get('/unidadesEntidad/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Unidades asociadas a la Entidad (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT CVE_OOAD, NOM_CORTO, NOM_OOAD, CVE_ENTIDAD FROM SIAC_OOAD WHERE CVE_ENTIDAD = ${id}`;

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la(s) Unidad(es) asociadas a una Entidad (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No existe información',
                respuesta: '{}'
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
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
    console.log('==========================================================================');
    console.log('Catalogo Tipo de Problematicas (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');
    const sql = 'SELECT * FROM SIAC_TIPO_PROBLEMATICA';

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Catalogo Tipo de Problematicas (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No hay datos',
                respuesta: '{}'
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                 P  R  O  B  L  E  M  A  T  I  C  A  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todos la problematica (Ruta: problematicas)
// =============================================================================
app.get('/problematicas', ( req, res ) => {
    console.log('==========================================================================');
    console.log('Problematicas (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');
    const sql = 'SELECT * FROM SIAC_PROBLEMATICA';

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Consulta de Problematicas (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No hay datos',
                respuesta: {}
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. GET - Consulta las Problematicas por Tipo (Ruta: problematicasTipo)
// =============================================================================
app.get('/problematicasTipo/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Problematicas por Tipo (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT CVE_PROBLEMATICA, NOM_NOMBRE, CVE_TIPO_PROBLEMATICA FROM SIAC_PROBLEMATICA WHERE CVE_TIPO_PROBLEMATICA = ${id}`;

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la(s) Problematica(s) asociadas a un tipo (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No existe información',
                respuesta: '{}'
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//                       N  I  V  E  L  E  S
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todo el catalogo de niveles (Ruta: niveles)
// =============================================================================
app.get('/niveles', ( req, res ) => {
    console.log('==========================================================================');
    console.log('Catalogo Niveles (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');
    const sql = 'SELECT * FROM SIAC_NIVEL';

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Catalogo de Niveles (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No hay datos',
                respuesta: {}
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//               O O A D    P  R  O  B  L  E  M  A  T  I  C  A
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todos los registros de OOAD Problematica (Ruta: ooadProblematicas)
// =============================================================================
app.get('/ooadProblematicas', ( req, res ) => {
    console.log('==========================================================================');
    console.log('OOAD Problematicas (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');
    const sql = 'SELECT * FROM SIAC_OOAD_PROBLEMATICA';

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'OOAD Problematicas (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No hay datos',
                respuesta: {}
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});

// =============================================================================
// End Point. GET - Consulta una OOAD Problematica (Ruta: ooadProblematicas)
// =============================================================================
app.get('/ooadProblematicas/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Problematicas (  IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_OOAD_PROBLEMATICA WHERE CVE_OOAD_PROBLEMATICA = ${id}`;

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la OOAD Problematica (IMSS-CDI)',
                respuesta: resultado
            }
        } else {
            respuesta = {
                status: false,
                code: 501,
                message: 'No existe información',
                respuesta: {}
            }
        }
        res.json(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. POST - Agrega una OOAD Problematica (Ruta: ooadProblematicas/add)
// =============================================================================
app.post('/ooadProblematicas/add', ( req, res ) => {
    const sql = 'INSERT INTO SIAC_OOAD_PROBLEMATICA SET ?';
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
        FEC_BAJA: req.body.fecha_baja
    }

    console.log('==========================================================================');
    console.log('Alta de una Problematicas ( IMSS-CDI) ');
    console.log(ooadProblematicaObj);
    console.log('--------------------------------------------------------------------------');

    conexionBBDD.query(sql, ooadProblematicaObj, error => {
/*
        if (error) throw error;

        respuesta = {
            status: true,
            code: 201,
            message: 'OOAD Problematica creada!',
            respuesta: {}
        }
    
        res.send(respuesta);
*/

        if (error) {
            //Do not throw err as it will crash the server. 
            console.log(error.code);
            console.log(error.message);
            const codError = "ERROR | Codigo: " + error.code;
            const msgError = "     Mensaje: " + error.message;
            const errorResult = codError + msgError;
            console.log(errorResult);
            respuesta = {
                status: false,
                code: 500,
                message: errorResult,
                respuesta: {}
            }

        } else {
            respuesta = {
                status: true,
                code: 201,
                message: 'OOAD Problematica creada!',
                respuesta: {}
            }
        
        }
//        console.log("Problematica-ADD Respuesta:  " + respuesta);

//        console.log("Problematica-ADD Respuesta:  " + JSON.stringify(respuesta, ['status'], ['code'], ['message'], ['respuesta']));
        console.log("Problematica-ADD Respuesta:  " + JSON.stringify(respuesta, null, '-'));

//        console.log(JSON.stringify(usuario, null,'--'));


        res.send(respuesta);
    });

    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});

////////////////////////////////////////////////////////////////////////////////
// Llamamos a la funciòn listen, para verificar si hay eco en el puerto
////////////////////////////////////////////////////////////////////////////////
app.listen( PORT, () => console.log(`Server Running on Port ${PORT}`));
console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   




