import Router from 'express';
import { inscribir } from '../controllers/inscripciones.controller.js';
import upload from '../middlewares/upload.js';
const router = Router();

router.post('/inscripcion', upload.single('comprobante'), inscribir);
  
export default router;