import { Router } from 'express';
import { pool } from '../db.js';
import { getCliente,getClientes,createCliente, deleteCliente,updateCliente,getFolios,getPlanes, getPlanInfo} from '../controllers/clientes.controllers.js';
const router = Router();


//clientes
router.get('/clientes',getClientes );

router.get('/clientes/:id', getCliente);

router.post('/clientes',createCliente );

router.delete('/clientes/:id',deleteCliente);

router.put('/clientes/:id', updateCliente);

//Planesdemuestreo
router.get('/planes',getPlanes)

router.get('/plan/:id',getPlanInfo)


export default router;