'use strict'

import path from 'node:path'
import ProcessorText from './ProcessorText.js'

import fs from 'node:fs'
import { promisify } from 'node:util'

import { pipeline } from 'node:stream'
import { Transform } from 'node:stream'

import {
    constants,
    createPrivateKey,
    createPublicKey,
    generateKeyPairSync,
    privateDecrypt,
    publicEncrypt
} from 'node:crypto'

import readJSON from '../utils/readJson.js'


const steroidPipeLine = promisify(pipeline);


/**
 * Represents a Crypto class for encryption and decryption operations.
 * @class
 */
class Crypto {
    constructor({ directory }) {
        const privateKey = 'privateKey.pem'
        const publicKey = 'publicKey.pem'

        const objTemp = readJSON('../configs/pathTemp.json')

        this.objProcessor = new ProcessorText();
        //* Ruta absoluta de la llave Privada
        this.pathPrivateKey = path.join(process.cwd(), 'src', directory, privateKey)
        //* Ruta absoluta de la llave publica
        this.pathPublicKey = path.join(process.cwd(), 'src', directory, publicKey)

        this.pathTemp = objTemp.temp;

        this.start()
            .then(() => console.log(true))
            .catch(() => console.log(false))
    }

    /**
     * Starts the crypto process.
     * @returns {Promise<{error: string}>} An object with an error message if an error occurs during the process.
     */
    start = async () => {
        try {
            await this.#validateFiles()
        } catch (error) {
            return { error: error.message }
        }
    }

    /**
     * Extracts the public and private keys from the specified file paths.
     * @returns {Promise<{ publicKey: string, privateKey: string } | { error: string }>} The extracted keys or an error message.
     */
    extractKeys = async () => {
        try {
            await this.#validateFiles()

            const publicKey = await fs.promises.readFile(this.pathPublicKey, 'utf-8')
            const privateKey = await fs.promises.readFile(this.pathPrivateKey, 'utf-8')

            return {
                publicKey,
                privateKey
            }

        } catch (error) {
            return { error: error.message }
        }
    }


    /**
     * Validates a private key.
     * @param {string} privateKey - The private key to validate.
     * @returns {boolean} - Returns true if the private key is valid, false otherwise.
     */


    privateKeyValidator = (privateKey) => {
        try {
            createPrivateKey({
                key: privateKey,
                format: 'pem'
            })

            return true;
        } catch (error) {
            console.log('Error al validar llave privada', error.message);
            return false;
        }
    }

    /**
     * Encrypts the provided plain text using RSA encryption.
     * @param {Object} options - The encryption options.
     * @param {string} options.plainText - The plain text to be encrypted.
     * @returns {Promise<string>} A promise that resolves with the encrypted text.
     */
    encrypt = async ({
        inFilePath,
        outFilePath,
        offset,
        bytesEncrypt = 512,
        pkey = false
    }) => {

        return new Promise(async (resolve, reject) => {
            try {
                await this.#validateFiles();

                // const blocks = this.objProcessor.splitText(plainText)

                //!Extrayendo Key
                const publicKeyPem = fs.readFileSync(this.pathPublicKey, 'utf-8')
                const publicKey = createPublicKey(pkey ? pkey : publicKeyPem);
                //!Extrayendo Key

                const readStream = fs.createReadStream(inFilePath, { highWaterMark: (bytesEncrypt - offset) });
                const writeStream = fs.createWriteStream(outFilePath);

                const transform = new Transform({
                    transform(chunk, _, callback) {
                        try {
                            const encrypted = publicEncrypt(
                                {
                                    key: publicKey,
                                    padding: constants.RSA_PKCS1_PADDING
                                },
                                chunk
                            );
                            callback(null, encrypted);
                        } catch (error) {
                            console.log('Error: ', error.message);
                            callback(error);
                            reject(error);
                        }
                    }
                })

                await steroidPipeLine(
                    readStream,
                    transform,
                    writeStream
                )

                resolve(outFilePath);
                //TODO: Esto es la forma mas manual al manejar los Streams

                /*
                ?const offset = 11;
                ?const buffer = Buffer.from(plainText, 'utf-8')

                ?const bufferStream = new stream.PassThrough();
                bufferStream.end(buffer);

                let encryptedChunks = new Array();

                ?bufferStream.on('readable', () => {
                    let chunk;

                    while (null !== (chunk = bufferStream.read(512 - offset))) {
                        ! Encriptando el CHUNK
                        const encrypted = publicEncrypt(
                            {
                                key: publicKey,
                                padding: constants.RSA_PKCS1_PADDING,
                            },
                            chunk,
                        );

                        encryptedChunks.push(encrypted)
                    }

                })

                ?bufferStream.on('end', () => {
                    const encryptedText = Buffer.concat(encryptedChunks).toString('base64');
                    console.log(encryptedText);
                    resolve(encryptedText)
                })

                ?bufferStream.on('error', (err) => {
                    reject(err)
                })
                */


            } catch (error) {
                return { error: error.message }
            }
        })

    }



    /**
     * Decrypts a file using a private key.
     * @param {Object} options - The decryption options.
     * @param {string} options.filePath - The path of the file to decrypt.
     * @param {string} [options.pkey=false] - The private key to use for decryption. If not provided, the private key will be read from the file system.
     * @param {number} options.index - The index of the decrypted file.
     * @returns {Promise<string>} A promise that resolves with the path of the decrypted file.
     * @throws {Error} If there is an error during the decryption process.
     */
    decrypt = async ({ filePath, pkey = false, index }) => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.#validateFiles()

                //! Extrayendo Key
                const privateKeyPem = fs.readFileSync(this.pathPrivateKey, 'utf-8')
                const privateKey = createPrivateKey(pkey ? pkey : privateKeyPem)
                //! Extrayendo Key 

                const decryptedFilePath = path.join(this.pathTemp, `decrypted${index}.xlsx`);

                const readStream = fs.createReadStream(filePath, { highWaterMark: 512 });
                const writeStream = fs.createWriteStream(decryptedFilePath);

                const transform = new Transform({
                    transform(chunk, _, callback) {
                        try {
                            const decrypted = privateDecrypt(
                                {
                                    key: privateKey,
                                    padding: constants.RSA_PKCS1_PADDING
                                },
                                chunk,
                            );
                            // console.log('Texto desencriptado:');
                            callback(null, decrypted);
                        } catch (error) {
                            console.log('Error: ', error.message);
                            callback(error);
                            reject(error);
                        }
                    }
                });

                await steroidPipeLine(
                    readStream,
                    transform,
                    writeStream
                );

                resolve(decryptedFilePath)


                //!IMPORTANTE ESTO ES PARA LEER EL ARCHIVO
                // const offset = 0;
                // const buffer = Buffer.from(encryptedText, 'base64');

                // const bufferStream = new stream.PassThrough();
                // bufferStream.end(buffer);

                // let decryptChunk = new Array();

                // bufferStream.on('readable', () => {
                //     let chunk;

                //     while (null !== (chunk = bufferStream.read(512 - offset))) {
                //         //! Encriptando el CHUNK
                //         try {
                //             const decrypted = privateDecrypt(
                //                 {
                //                     key: privateKey,
                //                     padding: constants.RSA_PKCS1_PADDING
                //                 },
                //                 chunk,
                //             );
                //             decryptChunk.push(decrypted)
                //             console.log('Cargando el chunk ->', decrypted);
                //         } catch (error) {
                //             console.log('Aqui hubo un error', error.message);
                //             return reject(`Error de llave privada ${error.message}`);
                //         }

                //     }

                // })

                // bufferStream.on('end', () => {
                //     const decryptedText = Buffer.concat(decryptChunk).toString('utf8');

                //     return resolve(decryptedText);
                // })

                // bufferStream.on('error', (err) => {
                //     return reject(err)
                // })

            } catch (error) {
                return reject({ error: error.message })
            }
        })

    }

    generateKeys = async ({ keys = false }) => {
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096
        })

        const deleteFile = (err) => {

            if (err) {
                console.log('Hubo un error al borrar los archivos');
                return { error: err.message }
            }

            return true
        }

        try {

            if (!keys) {
                await fs.promises.writeFile(this.pathPrivateKey, privateKey.export({ type: 'pkcs1', format: 'pem' }))
                await fs.promises.writeFile(this.pathPublicKey, publicKey.export({ type: 'spki', format: 'pem' }));

                console.log('Se crearon los archivos correctamente');
            } else {
                const privateTempKey = path.join(this.pathTemp, 'privateKey')
                const publicTempKey = path.join(this.pathTemp, 'publicKey')

                await fs.promises.writeFile(privateTempKey, privateKey.export({
                    type: 'pkcs1',
                    format: 'pem'
                }))
                await fs.promises.writeFile(publicTempKey, publicKey.export({
                    type: 'spki',
                    format: 'pem'
                }))

                const keyPrivatePem = await fs.promises.readFile(
                    privateTempKey,
                    'utf-8'
                )
                const keyPublicPem = await fs.promises.readFile(
                    publicTempKey,
                    'utf-8'
                )

                fs.unlink(privateTempKey, deleteFile);
                fs.unlink(publicTempKey, deleteFile);

                // console.log(keyPrivatePem, '\n\n', keyPublicPem);
                return {
                    privateKey: keyPrivatePem,
                    publicKey: keyPublicPem
                }
            }


        } catch (error) {
            console.log('Hubo un error al crear los archivos', error.message);
            return false;
        }
    }

    #validateFiles = async () => {

        try {
            const existsPrivateFile = await this.#fileExists(this.pathPrivateKey)
            const existsPublicFile = await this.#fileExists(this.pathPublicKey)

            if (!existsPrivateFile || !existsPublicFile) {
                await this.generateKeys({})
                await this.#validateFiles()
            }

            return true
        } catch (error) {
            console.log('Hubo un error al validar archivos', error);
            return false
        }


    }

    //! El segundo parametro de fs.access se utiliza como argumento para verificar la existencia de un archivo o directorio
    #fileExists = async (pathFile) => {

        try {
            await fs.promises.access(pathFile, fs.constants.F_OK);
            return true;
        } catch (error) {
            console.log('El archivo no existe', error.message);
            return false;
        }
    }
}

export default Crypto