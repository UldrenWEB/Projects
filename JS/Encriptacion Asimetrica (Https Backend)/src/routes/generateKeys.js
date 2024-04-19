import { Router } from "express";
import GenerateKeysController from "../controllers/GenerateKeysController.js";

const createGenerateKeysRouter = () => {
    const generateKeysRouter = Router()


    generateKeysRouter.get('/', GenerateKeysController.generateKeys)

    generateKeysRouter.post('/', (req, res) => {
        res.status(405).json({ error: 'El metodo POST no esta habilitado, obtener llaves con el metodo GET' })
    })


    return generateKeysRouter;
}

export default createGenerateKeysRouter