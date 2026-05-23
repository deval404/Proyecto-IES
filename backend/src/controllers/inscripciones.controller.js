import { supabase } from '../config/db.js';

export const inscribir = async (req, res) => {

    try{
    const { nombre, apellido, mail, dni } = req.body;
    const archivo = req.file;

    if (!archivo) {
        return res.status(400).json(); //archivo requerido
    }

    const extencion = archivo.originalname.split('.').pop().toLowerCase();
    const nombreArchivo = `${dni}-${Date.now()}_${extencion}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('comprobantes')
        .upload(nombreArchivo, archivo.buffer, {
            contentType: archivo.mimetype,
        });

    if (uploadError) throw uploadError;

    const {data: urlData } = supabase.storage
        .from('comprobantes')
        .getPublicUrl(nombreArchivo);

    const comprobanteUrl = urlData.publicUrl;

    const {data: insertData, error: insertError} = await supabase
        .from('inscripciones')
        .insert([
            { nombre, apellido, mail, dni, comprobanteUrl: comprobanteUrl }
        ]);

    if (insertError) throw insertError;

    res.status(201).json(); //inscripcion extitosa
    } catch (error) {
        console.error(error);
        res.status(500).json(); //error de server
    }

};

export default { inscribir };