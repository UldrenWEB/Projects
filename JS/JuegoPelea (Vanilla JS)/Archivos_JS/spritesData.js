'use strict'

 //Esta es una funcion que carga a un jugador segun su id
 export function sprites(id) {
    let spritesPlayers = new Map();

    spritesPlayers.set("samurai", {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit:{
            imageSrc: './img/samuraiMack/Take hit.png',
            framesMax: 4
        },
        death:{
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }
    })


    spritesPlayers.set("kenji", {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit:{
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },
        death:{
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    })


    spritesPlayers.set("huntress", {
        idle: {
            imageSrc: './img/huntress/Idle.png',
            framesMax: 10,
        },
        run: {
            imageSrc: './img/huntress/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/huntress/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/huntress/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/huntress/Attack.png',
            framesMax: 6,
        },
        takeHit:{
            imageSrc: './img/huntress/Get hit.png',
            framesMax: 3
        },
        death:{
            imageSrc: './img/huntress/Death.png',
            framesMax: 10
        }
    })

    spritesPlayers.set("Wizard", {
        idle: {
            imageSrc: './img/Wizard/Idle.png',
            framesMax: 6,
        },
        run: {
            imageSrc: './img/Wizard/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/Wizard/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/Wizard/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/Wizard/Attack1.png',
            framesMax: 8,
        },
        takeHit:{
            imageSrc: './img/Wizard/Hit.png',
            framesMax: 4
        },
        death:{
            imageSrc: './img/Wizard/Death.png',
            framesMax: 7
        }
    })
    spritesPlayers.set("HeroKnight", {
        idle: {
            imageSrc: './img/HeroKnight_Player2/Idle.png',
            framesMax: 11,
        },
        run: {
            imageSrc: './img/HeroKnight_Player2/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/HeroKnight_Player2/Jump.png',
            framesMax: 4,
        },
        fall: {
            imageSrc: './img/HeroKnight_Player2/Fall.png',
            framesMax: 4,
        },
        attack1: {
            imageSrc: './img/HeroKnight_Player2/Attack.png',
            framesMax: 6,
        },
        takeHit:{
            imageSrc: './img/HeroKnight_Player2/Take hit.png',
            framesMax: 4
        },
        death:{
            imageSrc: './img/HeroKnight_Player2/Death.png',
            framesMax: 9
        }
    })

    return spritesPlayers.get(id);
}
// console.log(sprites(1))