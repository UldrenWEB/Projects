'use strict'

//Evento load para poner el script en el head
window.addEventListener('load', () => {

    //Variable para el id de la pantalla
    var cajero = document.getElementById("Panty")

    var teclado = document.querySelectorAll(".tec")

    for (var botones in teclado) {
        let click = teclado[botones]
        console.log(click.innerText)

        click.addEventListener('click', () => {
            console.log(click.innerText)

            if (click.innerHTML == "=") {
                let resultado = eval(cajero.value)
                cajero.value = resultado
            } else if (click.innerHTML == "C") {
                cajero.value = " "
            } else {
                cajero.value += click.innerHTML
            }

        })
    }



})

