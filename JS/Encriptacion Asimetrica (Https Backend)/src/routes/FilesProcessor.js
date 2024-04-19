'use strict'

import { Router } from "express";
import FileProcessorController from "../controllers/FilesProcessorController.js";

const createFileProcessorRouter = () => {
    const controller = new FileProcessorController();
    const fileProcessorRouter = Router()

    fileProcessorRouter.get('/', (req, res) => {
        res.status(405).json({ error: 'La funcion de GET no esta habilitada, pasar archivos por POST' })
    })
    fileProcessorRouter.post('/', controller.middleware, controller.decryptFile);


    return fileProcessorRouter;
}

export default createFileProcessorRouter;