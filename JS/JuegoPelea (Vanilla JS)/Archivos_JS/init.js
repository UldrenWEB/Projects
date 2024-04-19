'use strict'
import { Start } from "./start.js";

class Button {
    constructor(){
        this.btn;
    }
    createBtn() {
        this.btn = document.createElement("div");
        document.body.appendChild(this.btn);

        this.btn.id = "but";
        this.btn.className = "but";
        this.btn.textContent = "Start";
    }
}

let m = new Start()
let myButton = new Button();
myButton.createBtn();


myButton.btn.addEventListener("click", () => {
    //Inicia el audio al darle play al juego
    m.musicaFondo.playAudios();
    
    //Hacemos visible el container que encierra al canvas
    m.container.style.display = "inline-block";
    //Le damos la animacion a ese container que al aparecer la haga
    m.container.style.animation = "animate 1s linear";


    //Metemos dentro de nuetro body el webComponent
    document.body.append(m)
    myButton.btn.style.display = "none";
});






