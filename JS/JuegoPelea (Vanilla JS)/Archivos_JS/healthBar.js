'use strict'

export class HealthBar {
    constructor(containerPrinci) {//Le paso el parametro del container que es aquel que va a encerrar al canvas y a la barra de vida


        this.containerPrinci = containerPrinci
        this.containerPrinci.classList.add("containerPrinci")

        let contentHealthBar = document.createElement("div")
        contentHealthBar.classList.add("contentHealthBar");


        //Inicio Barra de jugador
        this.vidaJugador = document.createElement("div")
        this.vidaJugador.classList.add('vidaJugador')
    
        this.playerHealth = document.createElement('div')
        this.playerHealth.classList.add('playerHealth')

        this.vidaJugador.appendChild(this.playerHealth)

        let sangreJugador = document.createElement('div')
        sangreJugador.classList.add('sangreJugador')

        this.vidaJugador.append(sangreJugador)
        //Fin de Barra de jugador


        //Inicio Timer
        this.timer = document.createElement("div")
        this.timer.classList.add("timer")

        // this.timer.innerHTML = 10;
        //Fin Timer

        //Inicio de Barra de enemigo
        this.vidaEnemigo = document.createElement("div")
        this.vidaEnemigo.classList.add('vidaEnemigo')
    
        this.enemyHealth = document.createElement('div')
        this.enemyHealth.classList.add("enemyHealth")

        this.vidaEnemigo.appendChild(this.enemyHealth)

        let sangreEnemigo = document.createElement('div')
        sangreEnemigo.classList.add('sangreEnemigo')

        this.vidaEnemigo.append(sangreEnemigo)
        //Fin de Barra de enemigo


        //Inicio del texto 
        this.textoGameOver = document.createElement("div")
        this.textoGameOver.classList.add("texto")
        // this.textoGameOver.innerHTML = 'Tiempo'
        //Fin del texto


        //Agregando todos los elementos a la barra de vida
        contentHealthBar.append(this.vidaJugador)
        contentHealthBar.append(this.timer)
        contentHealthBar.append(this.vidaEnemigo)


        //Agregando al container principal toda la barra de vida
        this.containerPrinci.append(contentHealthBar)
        this.containerPrinci.append(this.textoGameOver)



    }

    //Metodo que disminuye el tiempo del contador y comprueba que jugador tiene mas vida o si tienen la misma para determinar quien gano si se termino el tiempo
    decreaseTimer({ player1, player2, timer, audio}) {
        let player = player1
        let enemy = player2
        let textTimer = this.timer
        let textoGameOver = this.textoGameOver
        let closeTimer;

        function timeTimer() {
            if (timer > 0) {
                closeTimer = setTimeout(timeTimer, 1000)
                timer--
                textTimer.innerHTML = timer
            } else if (timer === 0) {
                audio.pauseAudio();
                console.log('Se acabo el tiempo');
                //Paro el tiempo
                clearTimeout(closeTimer);
                //Hago aparecer el texto en cuanto se acabe el tiempo
                textoGameOver.style.display = "flex";
                // textoGameOver.innerHTML = "Paso por aqui"
                if (player.health === enemy.health) {
                    textoGameOver.innerHTML = "Empate";
                } else if (player.health > enemy.health) {
                    textoGameOver.innerHTML = "Player 1 Wins";
                } else if (player.health < enemy.health) {
                    textoGameOver.innerHTML = "Player 2 Wins";
                }

            }
            if (player.health <= 0 || enemy.health <= 0) {
                audio.pauseAudio();
                //Para el tiempo cuando alguno gane
                clearTimeout(closeTimer);
                //Hace visible el texto
                textoGameOver.style.display = "flex";
                // textoGameOver.innerHTML = "Paso por aqui"
                if (player.health === enemy.health) {
                    textoGameOver.innerHTML = "Empate";
                } else if (player.health > enemy.health) {
                    textoGameOver.innerHTML = "Player 1 Wins";
                } else if (player.health < enemy.health) {
                    textoGameOver.innerHTML = "Player 2 Wins";
                }
            }

        }
        timeTimer()

    }


}
