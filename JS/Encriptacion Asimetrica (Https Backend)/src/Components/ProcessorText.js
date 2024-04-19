'use strict'


class ProcessorText {
    constructor() {

        this.blockSize = 400;
        this.maxBlockSize = 500;
        this.blocks = new Array();

    }

    splitText = (plainText) => {
        if (plainText.length <= this.maxBlockSize) {
            this.blocks.push(plainText)
        } else {
            let startIndex = 0;
            while (startIndex < plainText.length) {
                const endIndex = Math.min(startIndex + this.blockSize, plainText.length);
                const block = plainText.substring(startIndex, endIndex)
                this.blocks.push(block);
                startIndex += this.blockSize;
            }
        }

        return this.blocks;
    }


}

export default ProcessorText
