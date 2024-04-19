'use strict'

//Este evento es para poder colocar el script en el head y asi pueda 
//cargar todo el JS 
window.addEventListener('load', () => {

    const boton = document.querySelectorAll(".boton");
    const content = document.querySelectorAll(".content");

    const moveLine = document.querySelector(".move-line")




    //Aqui recorremos toda la lista con clase (botons) usando este forEach
    boton.forEach((cadaboton, i) => {


        //Luego se le asigno un CLICK a cada elemento de esta lista
        boton[i].addEventListener('click', () => {

            boton.forEach((cadaboton, i) => {

                //Le quitamos la clase active al boton y al contenido que lo tenga
                //para asi añadirselo al boton que se le haga click
                boton[i].classList.remove('move');
                content[i].classList.remove('move');


            })

            //A ese boton que le hemos hecho click le añadimos la clase (active)
            boton[i].classList.add('move')
            content[i].classList.add('move')

            var subcontainer = document.querySelector('.subcontainer')

            switch (i) {
                case 0:
                    moveLine.style.left = "0%"
                    moveLine.style.width = "34.1%"
                    subcontainer.style.height = "90vh"
                    break;
                case 1:
                    moveLine.style.left = "34.1%"
                    moveLine.style.width = "34.29%"
                    subcontainer.style.height = "170vh"
                    break;
                case 2:
                    moveLine.style.left = "68.4%"
                    moveLine.style.width = "31.6%"
                    subcontainer.style.height = "70vh"
                    break;

            }


        })
    })
})




