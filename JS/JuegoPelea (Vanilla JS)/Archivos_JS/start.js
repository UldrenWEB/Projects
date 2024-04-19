'use strict '
import { Sprite, Fighter, armaColision } from "./players_sprites.js"
import { HealthBar } from "./healthBar.js";
import { sprites } from "./spritesData.js";
import {Audios} from "./audio.js"

export class Start extends HTMLElement {
    constructor() {
        super()


        //Audios para el juego
        this.audioTakeHit = new Audios({
            audioSrc: './audios/audioTakeHit3.wav'
        })
        this.audioTakeHit2 = new Audios({
            audioSrc: './audios/audioTakeHit2.wav'
        })
        this.musicaFondo = new Audios({
            audioSrc: './audios/musicaEpicaFondo.mp3'
        })

        /*
        * Inicio de mi constructor
        */

        this.container = document.createElement("div")
        this.container.style.display = "none"
        
        
        //Inicio de instancias
        this.HealthBar = new HealthBar(this.container)
        
        //Fin de instancias
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")

        //Implemento dentro del body el canvas
        this.container.appendChild(this.canvas)
        document.body.append(this.container)


        this.canvas.width = 1024;
        this.canvas.height = 576;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)//Pinto el canvas de negro

        //Aqui instanciamos el fondo que tendra el canvas
        this.background = new Sprite({
            canvas: this.canvas,
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/BakcgroundTekken.png'
        })

        //Aqui instanciamos el slime
        this.slime = new Sprite({
            canvas: this.canvas,
            position: {
                x: 880,
                y: 360
            },
            imageSrc: './img/Slimes/SlimeOrange_Sprite.png',
            scale: .4,
            framesMax: 30
        })

        //Aqui instanciamos la plantita
        this.blueFlower = new Sprite({
            canvas: this.canvas,
            position: {
                x: 630,
                y: 393
            },
            imageSrc: './img/Plant Animations/BlueFlower_Sprite.png',
            scale: .2,
            framesMax: 60
        })

        //Aqui instanciamos al brujito
        this.blueWizard = new Sprite({
            canvas:this.canvas, 
            position:{
                x: -70,
                y: 370
            },
            imageSrc: './img/BlueWizard/blueWizard_Sprite.png',
            scale: 0.3,
            framesMax: 20
        })



        //Aqui se instacia nuestro jugador 1
        this.player = new Fighter({
            canvas: this.canvas,
            position: {
                x: 90,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            imageSrc: './img/Wizard/Idle.png',
            framesMax: 6,
            scale: 1.4,
            offset: {
                x: 130,
                y: 47,
            },
            sprites: sprites("Wizard"),
            attackBox: {
                offset: {
                    x: 60,
                    y: 60
                },
                width: 110,
                height: 50
            }
        });

        //Aqui se instancia a nuestro jugador 2
        this.enemy = new Fighter({
            canvas: this.canvas,
            position: {
                x: 850,
                y: 100
            },
            velocity: {
                x: 0,
                y: 0
            },
            imageSrc: './img/HeroKnight_Player2/Idle.png',
            framesMax: 11,
            scale: 2.5,
            offset: {
                x: 150,
                y: 55,
            },
            sprites: sprites("HeroKnight"),
            attackBox: {
                offset: {
                    x: -135,
                    y: 65
                },
                width: 120,
                height: 50
            }

        })

        //Teclas a presionadas
        this.keys = {
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },
            w: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
            ArrowUp: {
                pressed: false
            }

        }

        /*
        * Fin de mi constructor
        */
    }
    connectedCallback() {
        console.log('Se instancio correctamente');
        this.gameActions()
        this.movementPlayers()

        //Game Over segun el tiempo y la vida del jugador
        this.HealthBar.decreaseTimer({
            player1: this.player,
            player2: this.enemy,
            timer: 60,
            audio: this.musicaFondo
        })

    }


    gameActions() {
        //Aqui se define porque dentro de la funcion no se puede llamar las propiedades de clase
        let ctx = this.ctx;
        let player = this.player;
        let enemy = this.enemy;

        //Inicio de Instancias de para adornar
        let background = this.background;
        let slime = this.slime;
        let blueFlower = this.blueFlower;
        let blueWizard = this.blueWizard;
        //Fin de instancias para adornar

        let keys = this.keys;
        let canvas = this.canvas;
        let healthBar = this.HealthBar;

        //Inicio audios
        let audioTakeHit = this.audioTakeHit
        let audioTakeHit2 =  this.audioTakeHit2
        //Fin audios


        console.log(player)

        //Mi animation Frame
        function animate() {
            window.requestAnimationFrame(animate)
            //Nos aseguramos de actualizar nuestro canvas y asi mantener a los jugadores como un objeto individual
            background.update();
            slime.update()
            blueFlower.update()
            blueWizard.update()
            //Con esto resaltamos levemente a nuestros jugadores
            ctx.fillStyle = 'rgba(255, 255, 255, 0.30)';
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            player.update()
            enemy.update()


            //Configurando el moviemiento del jugador los fluido posible y se logra haciendo con este if el movimiento que a mi configurando el movimiento dentro del mismo evento habia ciertos errores como que si tocaba dos teclas el jugador se dejaba de mover y aqui no pasa eso ya que se mueve a la tecla que tenga mas prioridad
            //Logica sobre el movimiento del jugador, se hace aqui para evitar algun lag al momento de presionar ambas teclas(asi lo veo yo, probe de las dos maneras y hay fallos cuando presionar ambas es como si se para el jugador al momento de apretar la otra tecla)

            //Se mueven gracias a la velocidad como se explico
            player.velocity.x = 0//Se inicializa en 0 para que se actualice y al dejar de apretar la tecla pues no se mueva
            enemy.velocity.x = 0

            //Aqui le decimos al jugador que su si no se esta moviendo su movimiento por defecto sera el de idle


            //Movimiento del jugador
            if (keys.a.pressed === true && player.lastKey === 'a') {
                player.velocity.x = -5
                player.switchSprites('run');
                // player.image = player.sprites.run.image
                // player.framesMax = player.sprites.run.framesMax

            } else if (keys.d.pressed === true && player.lastKey === 'd') {
                player.velocity.x = 5
                player.switchSprites('run');
                // player.image = player.sprites.run.image
                // player.framesMax = player.sprites.run.framesMax

            } else {
                //Aqui verificamos si no estamos presionando ni a ni d entonces la posicion que tomara es de inactivo
                player.switchSprites('idle')
            }


            //Configurando el salto del jugador que permite al jugador saltar como maximo una vez
            if (keys.w.pressed === true && player.lastKey === 'w' && player.position.y + player.height >= canvas.height - 87) {
                player.velocity.y = -17
            }


            //Salto animado del jugador
            if (player.velocity.y < 0) {
                //Aqui configuramos el salto del jugador que para saltar la velocidad se vuelve negativa
                // console.log(player.velocity.y)
                player.switchSprites('jump')
                /* 
                that.player.image = that.player.sprites.jump.image
                */
                //Aqui nos aseguramos de que esta imagen guarde los framesMax que tiene en si y no utlice los del sprite de idle, pero esto modifica los demas por lo que hay un error ahi ya que intenta hacer el salto con 2 de framesMax mientras que las otras cuentan con 8 framesMax. Esto lo solucianamos con Switch y ejecutando cada accion por separado al igual que el sprite

                /*
                that.player.framesMax = that.player.sprites.jump.framesMax
                */
            } else if (player.velocity.y > 0) {
                //Aqui configuramos la caida del jugador ya que al bajar la velocidad se vuelve positiva
                // console.log(player.velocity.y)
                player.switchSprites('fall')
            }


            //Movimiento del enmigo
            if (keys.ArrowLeft.pressed == true && enemy.lastKey === 'ArrowLeft') {
                enemy.velocity.x = -5
                enemy.switchSprites('run')
            } else if (keys.ArrowRight.pressed == true && enemy.lastKey === 'ArrowRight') {
                enemy.velocity.x = 5
                enemy.switchSprites('run')
            } else {
                enemy.switchSprites('idle')
            }

            //Aqui nos aseguramos de que el jugador 2 no salte mas de una vez que solo pueda saltar cuando toque el suelo
            if (keys.ArrowUp.pressed === true && enemy.lastKey === 'ArrowUp' && enemy.position.y + enemy.height >= canvas.height - 87) {
                enemy.velocity.y = -17
            }

            if (enemy.velocity.y < 0) {
                enemy.switchSprites('jump')
            } else if (enemy.velocity.y > 0) {
                enemy.switchSprites('fall')
            }



            //Deteccion de colision con el attackBox
            //Deteccion del enemigo con el jugador
            if (armaColision({
                arma1: player, 
                arma2: enemy}) 
                && player.isAttacking 
                && player.framesCurrent === 4) {//Decimos que detectara y bajara vida cuando el sprite del ataque llegue a su 4 frame para asi al atacar se vea reflejado en la vida cuando la espada toque al otro jugador


                //Hacemos el ataque false para asegurarnos de que solo sea un ataque o un solo golpe el que realice el jugador
                player.isAttacking = false
                console.log('Ataque del jugador')
                audioTakeHit.playAudios()//Inicia el audio del golpe
                enemy.takeHit()

                enemy.health -= 25
                healthBar.enemyHealth.style.width = `${enemy.health}%`

            }

            //Establecemos en false cuando haya atacado ya que sino se quedaria en true y al ingresar en la colision se veria afectada la vida, tambien detectamos cuando el jugador falla su ataque
            if (player.isAttacking && player.framesCurrent === 4) {
                player.isAttacking = false
                console.log("Jugador ha fallado")
            }




            //Deteccion del jugador con el enemigo
            if (armaColision({
                arma1: enemy,
                arma2: player
            }) && enemy.isAttacking && enemy.framesCurrent === 4) {
                enemy.isAttacking = false
                console.log('Ataque del enemigo')
                player.health -= 12.5
                player.takeHit();
                audioTakeHit2.playAudios()
                healthBar.playerHealth.style.width = `${player.health}%`
            }

            //Fallo en el ataque del enemigo
            if (enemy.isAttacking && enemy.framesCurrent === 4) {
                enemy.isAttacking = false
                console.log("El enemigo ha fallado")
            }



        }
        animate()

    }


    //Metodo el cual detecta la tecla pulsada para poder mover al jugador
    movementPlayers() {
        let player = this.player
        let enemy = this.enemy
        let keys = this.keys
        //Eventos para detectar las teclas pulsadas y hacer mover a los jugadores con teclas especificas
        window.addEventListener('keydown', (e) => {
            // console.log(e.key)

            if (!player.dead) {//Aqui indicamos que al morir el jugador no se podra mover, en cambio el otro jugador si


                //Moviemiento del jugador
                switch (e.key) {
                    case 'd'://Derecha
                        keys.d.pressed = true
                        player.lastKey = 'd'
                    break;

                    case 'a'://Izquierda
                        keys.a.pressed = true;
                        player.lastKey = 'a'
                        break;

                    case 'w'://Salto
                        keys.w.pressed = true
                        player.lastKey = 'w'
                        break;

                    //Tecla de Ataque del jugador
                    case ' ':
                        player.attack()
                    break;
                }
            }


            if (!enemy.dead) {

                //Movimiento del enemigo
                switch (e.key) {
                    case 'ArrowRight'://Derecha
                        keys.ArrowRight.pressed = true
                        enemy.lastKey = 'ArrowRight'
                    break;

                    case 'ArrowLeft'://Izquierda
                        keys.ArrowLeft.pressed = true;
                        enemy.lastKey = 'ArrowLeft'
                    break;

                    case 'ArrowUp'://Salto
                        keys.ArrowUp.pressed = true
                        enemy.lastKey = 'ArrowUp'
                    break;

                    //Tecla de Ataque del enemigo
                    case 'ArrowDown':
                        enemy.attack()
                    break;


                }
            }
        })
        //Con este evento capturamos cuando el usuario deje de presionar la tecla y hacemos que la tecla presionada sea false para asi para al jugador cuando se deje de pulsar esa tecla
        window.addEventListener('keyup', (e) => {
            // console.log(e.key)

            //Parando el moviemiento del jugador
            switch (e.key) {
                case 'd':
                    keys.d.pressed = false;
                    break;
                case 'a':
                    keys.a.pressed = false;
                break;
                case 'w':
                    keys.w.pressed = false
                break;

                //Parando el moviemiento del enemigo
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false;
                    break;
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false;
                break;
                case 'ArrowUp':
                    keys.ArrowUp.pressed = false;
                break;
            }
        })
    }

}
window.customElements.define("my-wc", Start)

// let m = new Start()
// document.body.append(m)






