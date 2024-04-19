'use strict'

import Crypto from "../Components/Crypto.js"
import fs from 'node:fs'
import ExcelManager from "../Components/ExcelManager.js"
import readJSON from "../utils/readJson.js"

class FileProcessorController {
    constructor() {

        this.crypto = new Crypto({
            directory: 'keys',
        })
        this.array = new Array();

        this.pathTemp = readJSON('../configs/pathTemp.json')
        this.pkey = false
    }

    //*Aqui valido si los archivos son correctos y si la llave privada esta en formato PEM
    middleware = (req, res, next) => {
        const files = req.files['files'];
        const privateKey = req.files['privateKey'];

        // console.log('Aqui files -> ', files);
        // console.log('Aqui privateKey -> ', privateKey);
        if (!files || files.length < 2) {
            return res.status(400).json({ error: 'Debes adjuntar al menos dos archivos' });
        }

        if (privateKey) {
            // console.log('Pasaron privateKey');
            const receivedPrivateKey = fs.readFileSync(privateKey[0].path, 'utf8')
            // console.log("PrivateKey", receivedPrivateKey);
            const isPkeyValid = this.crypto.privateKeyValidator(receivedPrivateKey)

            if (!isPkeyValid) {
                return res.status(400).json({ error: 'La llave privada no esta en un formato valido' })
            }
            this.#setPkey(true);
        }

        next();
    }

    //Esta funcion desencripta los archivos
    decryptFile = async (req, res) => {
        const files = req.files['files']
        const privateKey = req.files['privateKey']

        let received;

        try {
            if (privateKey) {
                // console.log('Pasaron PrivateKey', privateKey);
                received = fs.readFileSync(privateKey[0].path, 'utf-8')
            }

            const decryptedFilesPromises = files.map(async (file, index) => {

                try {
                    const decryptedFilePath = await this.crypto.decrypt({
                        filePath: file.path,
                        pkey: this.pkey ? received : false,
                        index: index
                    })

                    if (decryptedFilePath.error || !decryptedFilePath) {
                        // console.log('Hubo un error');
                        return res.status(400).json({ error: error.message })
                    }

                    const data = ExcelManager.readFile(decryptedFilePath);

                    return data;
                } catch (error) {
                    throw new Error('Ocurrio un error al descifrar el archivo, no es la llave privada correcta')
                }
            })

            const decryptedFiles = await Promise.all(decryptedFilesPromises);

            const winner = this.#calculateWinner(decryptedFiles);
            return res.status(200).json(winner);

        } catch (error) {
            // console.log('AQUI OCURRIO EL ERROR', error);
            return res.status(400).json({ error: error });
        }
    }


    /**
     * Encrypts the files using the provided encryption parameters.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<Object>} - A promise that resolves to the encrypted files or an error object.
     */
    encryptFile = async (req, res) => {

        try {
            const files = req.files['files'];
            const privateKey = req.files['privateKey'];
            let received;

            if (privateKey) {
                // console.log('Pasaron PrivateKey', privateKey);
                received = fs.readFileSync(privateKey[0].path, 'utf-8')
            }

            const obj = req.body;

            const encriptedFilesPromises = files.map(async (file) => {
                const encryptedFilePath = await this.crypto.encrypt({
                    inFilePath: file.path,
                    outFilePath: obj.path,
                    offset: obj.offset,
                    bytesEncrypt: obj.bytes,
                    pkey: this.pkey ? received : false
                })

                if (encryptedFilePath.error || !encryptedFilePath) {
                    return res.status(400).json({ error: error.message })
                }

                return encryptedFilePath;

            })

            const encryptedFiles = await Promise.all(encriptedFilesPromises);
            return res.status(200).json(encryptedFiles);

        } catch (error) {
            return { error: error.message }
        }
    }

    //Esta funcion se encarga de calcular el ganador pasandole el output de los archivos de excel
    #calculateWinner = (arrayObj) => {
        let lessPrice = Infinity;
        let lessPriceName;
        for (const obj of arrayObj) {

            if (obj['Precio'] < lessPrice) {
                lessPrice = obj['Precio'];
                lessPriceName = obj['Nombre'];
            }

        }

        // console.log(lessPrice, lessPriceName);
        return {
            name: lessPriceName,
            price: lessPrice
        }
    }


    #setPkey = (boolean) => {
        this.pkey = boolean;
    }
}

export default FileProcessorController; 