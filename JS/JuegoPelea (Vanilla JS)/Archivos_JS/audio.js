'use strict'

 export class Audios{
    constructor({audioSrc}){

        this.audio =  new Audio()
        this.audio.src = audioSrc
    }

    playAudios(){
        this.audio.play()
    }

    pauseAudio(){
        this.audio.pause()
    }

}


