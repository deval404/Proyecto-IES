import express, { json } from 'express';
import cors from 'cors';
const app = express();
import inscripcionesroutes from './backend/src/routes/inscripciones.routes.js';

app.use(cors());
app.use(express.json());
app.use(inscripcionesroutes);
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));