'use strict'

import Crypto from "../Components/Crypto.js"


class GenerateKeysController {

    static generateKeys = async (req, res) => {
        const crypto = new Crypto({
            directory: 'keys'
        })

        // const objKeys = await crypto.extractKeys()
        const objKeys = await crypto.generateKeys({
            keys: true
        })
        // console.log(objKeys);
        res.status(201).json(objKeys);
    }
}

export default GenerateKeysController