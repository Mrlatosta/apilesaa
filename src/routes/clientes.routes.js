import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js'; // 🔐
import { pool } from '../db.js';
import {
  getCliente, getClientes, createFolioMuestreo, deleteCliente, updateServicio,
  getFolios, getPlanes, getFolioInfo, getPlanServices, getDescripciones,
  getPlanInfo, getPlanCliente, getUltimoFolioMuestreo, createMuestra,
  updateFolio, getClienteLugares, createLugar, getPlanesRecortado,
  createMuestraExtra, createFolioMuestreoExtra, createFisicoquimicos
} from '../controllers/clientes.controllers.js';

const router = Router();

// Todas estas rutas están protegidas con JWT 🔐
router.use(verifyToken);

//clientes
router.get('/clientes', getClientes);
router.get('/clientes/:id', getCliente);
router.post('/crearfoliomuestreo', createFolioMuestreo);
router.post('/createfoliomuestreoextra', createFolioMuestreoExtra);
router.post('/createclientelugar', createLugar);
router.delete('/clientes/:id', deleteCliente);
router.put('/restarservicio/:id', updateServicio);
router.put('/completarfolio/:id', updateFolio);

//Planes de muestreo
router.get('/planes', getPlanes);
router.get('/planesrecortado', getPlanesRecortado);
router.get('/planinfo/:id', getPlanInfo);
router.get('/plancliente/:id', getPlanCliente);
router.get('/plan/:id', getPlanServices);
router.get('/clientelugar/:id', getClienteLugares);
router.get('/folio/:id', getFolioInfo);
router.get('/descripciones', getDescripciones);
router.get('/ultimofoliomuestreo', getUltimoFolioMuestreo);
router.post('/crearmuestra', createMuestra);
router.post('/createmuestraextra', createMuestraExtra);
router.post('/createfisicoquimicos', createFisicoquimicos);

export default router;
