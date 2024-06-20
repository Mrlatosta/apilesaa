import {pool} from '../db.js';


export const getClientes = async(req,res)=> {

    const {rows} = await pool.query('SELECT * from clientes order by id');
    res.json(rows);
    //res.send('obteniendo usuarios');
    //console.log(rows);
}

export const getFolios = async(req,res)=> {

    const {rows} = await pool.query('SELECT * from folios order by id');
    res.json(rows);
    //res.send('obteniendo usuarios');
    //console.log(rows);
}

export const getCliente = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('SELECT * from clientes where id = $1',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Cliente not found "});
    };
    res.json(rows[0]);
}

export const createFolioMuestreo = async(req,res)=> {

    try {

    
    const data = req.body
    //console.log(data)
    const {rows} = await pool.query('INSERT INTO folios_muestreos(folio, fecha, folio_cliente, folio_pdm) VALUES ($1, $2, $3, $4) RETURNING *', 
        [data.folio,data.fecha,data.folio_cliente,data.folio_pdm])
    //console.log({rows})
    //res.send('Creando usuario')
    return res.json(rows[0])
    }catch(error){
        if (error?.code === "23505"){
            return res.status(409).json({message: "Error"})
        }
    }
}

export const deleteCliente = async (req,res)=> {
    const {id} = req.params
    const {rowCount} = await pool.query('DELETE FROM clientes where id = $1 RETURNING *',[id]);
    console.log(rowCount);
    //console.log(rows)
    if (rowCount === 0){
        return res.status(404).json({message:"Cliente not found"});
    };

    //return res.json({rows})
    return res.sendStatus(204)
}

export const updateCliente = async (req,res)=> {
    const {id} = req.params; 
    const data = req.body;
    const {rows} = await pool.query('UPDATE clientes set nombre_empresa = $1, direccion = $2 where id = $3 RETURNING *',[data.nombre_empresa,data.direccion,id]);
    console.log(rows)
    //res.send('Actualizando usuario con id: ' + id);
    return res.json(rows[0])
}

//planesdemuestreos

export const getPlanes = async(req,res)=> {

    const {rows} = await pool.query('SELECT * FROM plandemuestreos WHERE DATE(fecha_hora_cita) = CURRENT_DATE ORDER BY id;');
    res.json(rows);
    //res.send('obteniendo usuarios');
    //console.log(rows);
}

export const getUltimoFolioMuestreo = async (req,res)=> {
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select folio from folios_muestreos order by folio desc limit 1');
    
    if (rows.length === 0){
    return res.status(404).json({message: "Error obteniendo ultimo folio "});
    };
    res.json(rows[0]);
}

export const getPlanInfo = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select pdm.nombre_pdm,pdm.pq_atendera,pdm.folio_id_cot,pdm.fecha_hora_cita,pdm.ingeniero_campo from plandemuestreos pdm join ordenesdecompra ON ordenesdecompra.orden_id = pdm.ordencompra_id join clientes ON clientes.folio = ordenesdecompra.cliente_folio where pdm.nombre_pdm = $1',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Plan not found "});
    };
    res.json(rows[0]);
}

export const getPlanCliente = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select clientes.giro,clientes.nombre_empresa,clientes.folio,clientes.direccion,clientes.estado,clientes.atencion,clientes.departamento,clientes.puesto,clientes.giro_empresa,clientes.telefono,clientes.correo,clientes.rfc from plandemuestreos pdm join ordenesdecompra ON ordenesdecompra.orden_id = pdm.ordencompra_id join clientes ON clientes.folio = ordenesdecompra.cliente_folio where pdm.nombre_pdm = $1',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Cliente not found "});
    };
    res.json(rows[0]);
}


export const getPlanServices = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select id,cantidad,estudios_microbiologicos,estudios_fisicoquimicos,descripcion,cantidad_de_toma from servicios_plandemuestreo where pdm = $1 order by id',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Plan not found "});
    };
    res.json(rows);
}

export const getFolioInfo = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select * from plandemuestreos join servicios_plandemuestreo ON servicios_plandemuestreo.pdm = plandemuestreos.nombre_pdm where nombre_pdm = $1',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Plan not found "});
    };
    res.json(rows);
}



export const getDescripciones = async(req,res)=> {

    const {rows} = await pool.query('SELECT * from descripciones order by id');
    res.json(rows);
    //res.send('obteniendo usuarios');
    //console.log(rows);
}

export const createMuestra = async (req, res) => {
    try {
      const data = req.body;
  
      // Query para insertar la muestra en la tabla 'muestras'
      const query = `
        INSERT INTO muestras(
          registro_muestra, folio_muestreo, fecha_muestreo, hora_muestreo,
          nombre_muestra, id_lab, cantidad_aprox, temperatura, lugar_toma,
          descripcion_toma, e_micro, e_fisico, observaciones, folio_pdm,servicio_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15)
        RETURNING *`;
  
      // Parámetros para el query
      const values = [
        data.registro_muestra,
        data.folio_muestreo,
        data.fecha_muestreo,
        data.hora_muestreo,
        data.nombre_muestra,
        data.id_lab,
        data.cantidad_aprox,
        data.temperatura,
        data.lugar_toma,
        data.descripcion_toma,
        data.e_micro,
        data.e_fisico,
        data.observaciones,
        data.folio_pdm,
        data.servicio_id
      ];
  
      // Ejecutar el query usando pool.query
      const { rows } = await pool.query(query, values);
  
      // Devolver la primera fila insertada como respuesta
      return res.json(rows[0]);
    } catch (error) {
      // Manejar errores
      console.error('Error en createMuestra:', error);
      if (error.code === "23505") {
        return res.status(409).json({ message: "Error de conflicto de llave única" });
      }
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };



