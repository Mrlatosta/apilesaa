import { Router } from 'express';
import { pool } from '../db.js';
import { getCliente,getClientes,createFolioMuestreo, deleteCliente,updateCliente,getFolios,getPlanes, getFolioInfo, getPlanServices, getDescripciones, getPlanInfo, getPlanCliente, getUltimoFolioMuestreo, createMuestra} from '../controllers/clientes.controllers.js';
const router = Router();

//largely-peaceful-polecat.ngrok-free.app
//clientes
router.get('/clientes',getClientes );

router.get('/clientes/:id', getCliente);

router.post('/crearfoliomuestreo',createFolioMuestreo );


router.delete('/clientes/:id',deleteCliente);

router.put('/clientes/:id', updateCliente);

//Planesdemuestreo
router.get('/planes',getPlanes)

router.get('/planinfo/:id',getPlanInfo)

router.get('/plancliente/:id',getPlanCliente)

router.get('/plan/:id',getPlanServices)

router.get('/folio/:id',getFolioInfo)

router.get('/descripciones',getDescripciones)

router.get('/ultimofoliomuestreo',getUltimoFolioMuestreo)

router.post('/crearmuestra',createMuestra)

export default router;