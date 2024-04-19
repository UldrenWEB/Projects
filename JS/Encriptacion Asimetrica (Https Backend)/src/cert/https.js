'use strict'

import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import readJSON from '../utils/readJson.js'

const pathCert = readJSON('../configs/pathCert.json')

const httpsServer = (app) => {

    const server = https.createServer({
        key: fs.readFileSync(path.join(process.cwd(), pathCert.privateKey)),
        cert: fs.readFileSync(path.join(process.cwd(), pathCert.cert))
    }, app);


    return server;
}

export default httpsServer;