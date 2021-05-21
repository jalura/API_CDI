// Creamos las instancias de las dependencias para nuestra API

// importamos express
const servExpress = require('express');
// importamos mysql
const mySql = require('mysql');
// importamos body-parse
const bodyParser = require('body-parser');

// En caso de que se realice el Deployment se define el puerto
// establecemos por default que si lo corremos localmente se apor el puero 3050
const PORT = process.env.PORT || 3050;

// Creamos una instancia del servidor express
const app = servExpress();

app.use(bodyParser.json());

// Creamos la instancia de conexion a MySql
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
    message: ''
};

// =====================================================================
// End Point ... Route
// Generamos un End Point desde el Path (Home de nuestra aplicacion) y el 
// CallBack que tiene como parametros el Request (req) y el Response (res) 
// Como los navegadores solo funciona con el verbo GET, lo podemos probar ahi: localhost:3050
// =====================================================================
app.get('/', ( req, res ) => {
    respuesta = {
        status: true,
        code: 200,
        message: 'Welcome to my API IMSS_CDI'
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
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Valida Matricula de usuario (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT CVE_USUARIO, NOM_NOMBRE, NOM_APELLIDOPATERNO, NOM_APELLIDOMATERNO, CVE_CORREO FROM SIAT_USUARIOS WHERE CVE_MATRICULA = ${id}`;
    console.log(sql);

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
    console.log(sql);

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

// =============================================================================
// End Point. GET - Consulta una entidad (Ruta: entidades)
// =============================================================================
app.get('/entidades/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Clave de Entidad (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_ENTIDAD WHERE CVE_ENTIDAD = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la entidad (IMSS-CDI)',
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
//               U  N  I  D  A  D  E  S     1er   N  I  V  E  L
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// End Point. GET - Consulta todos las unidades (Ruta: unidadesNivel1)
// =============================================================================
app.get('/unidadesNivel1', ( req, res ) => {
    console.log('==========================================================================');
    console.log('Catalogo Unidades Nivel 1 (IMSS-CDI)');
    console.log('--------------------------------------------------------------------------');

    const sql = 'SELECT * FROM SIAC_OOAD';
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Catalogo Unidades Nivel 1 (IMSS-CDI)',
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

// =============================================================================
// End Point. GET - Consulta una unidad nivel 1 (Ruta: unidadesNivel1)
// =============================================================================
app.get('/unidadesNivel1/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Clave de Unidad Nivel 1 (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_OOAD WHERE CVE_OOAD = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la Unidad Nivel 1 (IMSS-CDI)',
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


// =============================================================================
// End Point. GET - Consulta una unidad nivel 1 por Entidad (Ruta: unidadesEntidad)
// =============================================================================
app.get('/unidadesEntidad/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Unidades asociadas a la Entidad (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');

// select CVE_OOAD, NOM_CORTO, NOM_OOAD, CVE_ENTIDAD from IMSS_CDI.SIAC_OOAD WHERE CVE_ENTIDAD = 15;

    const sql = `SELECT CVE_OOAD, NOM_CORTO, NOM_OOAD, CVE_ENTIDAD FROM SIAC_OOAD WHERE CVE_ENTIDAD = ${id}`;
//const sql = `SELECT * FROM SIAC_OOAD WHERE CVE_OOAD = ${id}`;
    console.log(sql);

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
    console.log(sql);

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

// =============================================================================
// End Point. GET - Consulta un tipo de problema (Ruta: tipoProblematicas)
// =============================================================================
app.get('/tipoProblematicas/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Tipo de Problematicas (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_TIPO_PROBLEMATICA WHERE CVE_TIPO_PROBLEMATICA = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn del Tipo de Problematicas (IMSS-CDI)',
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

// =============================================================================
// End Point. POST - Agrega un tipo de problema (Ruta: tipoProblematicas/add)
// =============================================================================
app.post('/tipoProblematicas/add', ( req, res ) => {
    const sql = 'INSERT INTO SIAC_TIPO_PROBLEMATICA SET ?';
    // Creamos un objeto customer utilizando la dependecia body-parser
    const tipoProblematicaObj = {
        CVE_TIPO_PROBLEMATICA: req.body.clave,
        NOM_NOMBRE: req.body.nombre,
        FEC_EXPIRA: req.body.fecha_expira,
        FEC_ALTA: req.body.fecha_alta,
        FEC_ACTUALIZACION: req.body.fecha_actualizacion,
        FEC_BAJA: req.body.fecha_baja
    }

    conexionBBDD.query(sql, tipoProblematicaObj, error => {
        if (error) throw error;

        respuesta = {
            status: true,
            code: 202,
            message: 'Tipo de Problematica creado en el catalogo!',
            respuesta: {}
        }
    
        res.send(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. PUT - Actualiza un tipo de problema (Ruta: tipoProblematicas/update)
// =============================================================================
app.put('/tipoProblematicas/update/:id', ( req, res ) => {
    const {id} = req.params;
    const {nombre, fecha_expira, fecha_baja} = req.body;
    
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);
    var fecha_actualizacion = date;
    const sql = `UPDATE SIAC_TIPO_PROBLEMATICA SET NOM_NOMBRE = '${nombre}', FEC_EXPIRA = '${fecha_expira}', FEC_BAJA = '${fecha_baja}', FEC_ACTUALIZACION = '${fecha_actualizacion}' WHERE CVE_TIPO_PROBLEMATICA = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, error => {
        if (error) throw error;

        respuesta = {
            status: true,
            code: 201,
            message: 'Tipo de Problematica actualizado en el catalogo!',
            respuesta: {}
        }
    
        res.send(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});

// =============================================================================
// End Point. DELETE - Borraa un tipo de problema (Ruta: tipoProblematicas/delete)
// =============================================================================
app.delete('/tipoProblematicas/delete/:id', ( req, res ) => {
    const {id} = req.params;
    const sql = `DELETE FROM SIAC_TIPO_PROBLEMATICA WHERE CVE_TIPO_PROBLEMATICA = ${id}`;
    console.log(sql);    
    
    conexionBBDD.query(sql, error => {
        if (error) throw error;

        respuesta = {
            status: true,
            code: 201,
            message: 'Tipo de Problematica borrado del Catalog!',
            respuesta: {}
        }
    
        res.send(respuesta);

        res.send('Tipo de Problematica borrado del Catalog!');
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
    console.log(sql);

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
// End Point. GET - Consulta una problematica (Ruta: problematicas)
// =============================================================================
app.get('/problematicas/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Problematicas (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_PROBLEMATICA WHERE CVE_PROBLEMATICA = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn de la Problematica (IMSS-CDI)',
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
// End Point. POST - Agrega una problematica (Ruta: problematicas/add)
// =============================================================================
app.post('/problematicas/add', ( req, res ) => {
    const sql = 'INSERT INTO SIAC_PROBLEMATICA SET ?';
    // Creamos un objeto customer utilizando la dependecia body-parser
    const problematicaObj = {
        NOM_NOMBRE: req.body.nombre,
        CVE_TIPO_PROBLEMATICA: req.body.tipo_problema, 
        FEC_EXPIRA: req.body.fecha_expira,
        FEC_ALTA: req.body.fecha_alta,
        FEC_ACTUALIZACION: req.body.fecha_actualizacion,
        FEC_BAJA: req.body.fecha_baja
    }

    console.log(sql);
    conexionBBDD.query(sql, problematicaObj, error => {
        if (error) throw error;

        res.send('Problematica creada!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. PUT - Actualiza una problematica (Ruta: problematicas/update)
// =============================================================================
app.put('/problematicas/update/:id', ( req, res ) => {
    const {id} = req.params;
    const {nombre, tipo_problematica, fecha_expira, fecha_baja} = req.body;
    
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);
    var fecha_actualizacion = date;
    const sql = `UPDATE SIAC_PROBLEMATICA SET NOM_NOMBRE = '${nombre}', CVE_TIPO_PROBLEMATICA = '${tipo_problematica}', FEC_EXPIRA = '${fecha_expira}', FEC_BAJA = '${fecha_baja}', FEC_ACTUALIZACION = '${fecha_actualizacion}' WHERE CVE_PROBLEMATICA = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('Problematica actualizada!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. DELETE - Borra una Problematica (Ruta: problematicas/delete)
// =============================================================================
app.delete('/problematicas/delete/:id', ( req, res ) => {
    const {id} = req.params;
    const sql = `DELETE FROM SIAC_PROBLEMATICA WHERE CVE_PROBLEMATICA = ${id}`;
    console.log(sql);    
    
    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('Problematica borrada!');
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
    console.log(sql);

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

// =============================================================================
// End Point. GET - Consulta un niveles (Ruta: niveles)
// =============================================================================
app.get('/niveles/:id', ( req, res ) => {
    // Desestructuramos los paramettros que vienen en el request para obtener el ID
    const {id} = req.params;

    console.log('==========================================================================');
    console.log('Problematicas (IMSS-CDI) : <' + id + '>');
    console.log('--------------------------------------------------------------------------');
    const sql = `SELECT * FROM SIAC_NIVEL WHERE CVE_NIVEL = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, (error, resultado) => {
        if (error) throw error;

        if (resultado.length > 0) {
            respuesta = {
                status: true,
                code: 200,
                message: 'Informaciòn del Nivel (IMSS-CDI)',
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
// End Point. POST - Agrega un niveles (Ruta: niveles/add)
// =============================================================================
app.post('/niveles/add', ( req, res ) => {
    const sql = 'INSERT INTO SIAC_NIVEL SET ?';
    // Creamos un objeto customer utilizando la dependecia body-parser
    const nivelObj = {
        NOM_NOMBRE: req.body.nombre,
        NUM_NIVEL: req.body.num_nivel, 
        FEC_EXPIRA: req.body.fecha_expira,
        FEC_ALTA: req.body.fecha_alta,
        FEC_ACTUALIZACION: req.body.fecha_actualizacion,
        FEC_BAJA: req.body.fecha_baja
    }

    console.log(sql);
    conexionBBDD.query(sql, nivelObj, error => {
        if (error) throw error;

        res.send('Nivel creado!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. PUT - Actualiza un nivel (Ruta: niveles/update)
// =============================================================================
app.put('/niveles/update/:id', ( req, res ) => {
    const {id} = req.params;
    const {nombre, num_nivel, fecha_expira, fecha_baja} = req.body;
    
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);
    var fecha_actualizacion = date;
    const sql = `UPDATE SIAC_NIVEL SET NOM_NOMBRE = '${nombre}', NUM_NIVEL = '${num_nivel}', FEC_EXPIRA = '${fecha_expira}', FEC_BAJA = '${fecha_baja}', FEC_ACTUALIZACION = '${fecha_actualizacion}' WHERE CVE_NIVEL = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('Nivel actualizada!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. DELETE - Borra un Nivel (Ruta: niveles/delete)
// =============================================================================
app.delete('/niveles/delete/:id', ( req, res ) => {
    const {id} = req.params;
    const sql = `DELETE FROM SIAC_NIVEL WHERE CVE_NIVEL = ${id}`;
    console.log(sql);    
    
    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('Nivel borrado!');
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
    console.log(sql);

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
    console.log(sql);

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
    console.log('Responsable: <' +  ooadProblematicaObj.NOM_RESPONSABLE + '>');
    console.log('--------------------------------------------------------------------------');
    console.log(sql);

    conexionBBDD.query(sql, ooadProblematicaObj, error => {
        if (error) throw error;

        respuesta = {
            status: true,
            code: 201,
            message: 'OOAD Problematica creada!',
            respuesta: {}
        }
    
        res.send(respuesta);
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. PUT - Actualiza una OOAD Problematica (Ruta: niveles/ooadProblematicas)
// =============================================================================
app.put('/ooadProblematicas/update/:id', ( req, res ) => {
    const {id} = req.params;
    const {nombre, descripcion, cve_ooad, cve_problematica, cve_nivel, fecha_expira, fecha_baja} = req.body;
    
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2);
    var fecha_actualizacion = date;
    const sql = `UPDATE SIAC_OOAD_PROBLEMATICA SET NOM_RESPONSABLE = '${nombre}', DES_OTRO = '${descripcion}', CVE_OOAD = '${cve_ooad}', CVE_PROBLEMATICA = '${cve_problematica}', CVE_NIVEL = '${cve_nivel}', FEC_EXPIRA = '${fecha_expira}', FEC_BAJA = '${fecha_baja}', FEC_ACTUALIZACION = '${fecha_actualizacion}' WHERE CVE_OOAD_PROBLEMATICA = ${id}`;
    console.log(sql);

    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('OOAD Problematica actualizada!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});


// =============================================================================
// End Point. DELETE - Borra una OAD Problematica (Ruta: ooadProblematicas/delete)
// =============================================================================
app.delete('/ooadProblematicas/delete/:id', ( req, res ) => {
    const {id} = req.params;
    const sql = `DELETE FROM SIAC_OOAD_PROBLEMATICA WHERE CVE_OOAD_PROBLEMATICA = ${id}`;
    console.log(sql);    
    
    conexionBBDD.query(sql, error => {
        if (error) throw error;

        res.send('OAD Problematica borrado!');
    });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});

////////////////////////////////////////////////////////////////////////////////
// Se verifica la conexion a la BBDD
////////////////////////////////////////////////////////////////////////////////
/*
conexionBBDD.connect(error => {
    if (error) throw error;

    console.log('DataBase Server Running! ');
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   
});
*/



////////////////////////////////////////////////////////////////////////////////
// Llamamos a la funciòn listen, para verificar si hay eco en el puerto
////////////////////////////////////////////////////////////////////////////////
app.listen( PORT, () => console.log(`Server Running on Port ${PORT}`));
console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n');   




