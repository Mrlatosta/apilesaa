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

export const createCliente = async(req,res)=> {

    try {

    
    const data = req.body
    //console.log(data)
    const {rows} = await pool.query('INSERT INTO clientes(id,giro,nombre_empresa) values($1,$2,$3) RETURNING *',
        [data.id,data.giro,data.nombre_empresa])
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

    const {rows} = await pool.query('SELECT nombre_pdm from plandemuestreos order by id');
    res.json(rows);
    //res.send('obteniendo usuarios');
    //console.log(rows);
}


export const getPlanInfo = async (req,res)=> {
    const {id} = req.params;
    //res.send('obteniendo el usuario con id:' + id)
    const {rows} = await pool.query('select * from plandemuestreos join servicios ON servicios.pdm = plandemuestreos.nombre_pdm where nombre_pdm = $1',[id]);
    
    if (rows.length === 0){
    return res.status(404).json({message: "Plan not found "});
    };
    res.json(rows[0]);
}



