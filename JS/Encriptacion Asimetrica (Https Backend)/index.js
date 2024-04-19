'use strict'

import express from "express"
import httpsServer from './src/cert/https.js'
import cors from './src/middlewares/cors.js'
import multer from 'multer'

import FileProcessorRouter from "./src/routes/FilesProcessor.js"
import createGenerateKeysRouter from "./src/routes/generateKeys.js"



const PORT = process.env.PORT ?? 443;
const app = express();
const https = httpsServer(app)
const upload = multer({ dest: 'files/' })

// Manejo de errores de Multer
app.disable('x-powered-by')
app.use(cors);
//*Para recibir datos desde el formulario HTML (FORMDATA)*
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use('/fileProcessor', upload.fields([{ name: 'files', maxCount: 10 }, { name: 'privateKey', maxCount: 1 }]), FileProcessorRouter())
app.use('/generateKeys', createGenerateKeysRouter())

const listenServer = () => {
    console.log(`Server listening on Port ${PORT} -> https://localhost:${PORT}`);
}

//! Servidor Seguro -> HTTPS
https.listen(PORT, listenServer)
