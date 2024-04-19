'use strict'


export class Sprite {
    constructor( {canvas, position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0} }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d');
        //Posicion de nuestro jugador para darle la posicion a nuestro sprite
        this.position = position
        //Altura y ancho asociada los jugadores para asignar nuestro sprite
        this.height = 150
        this.width = 50
        //Aqui definimos la imagen con la clase y el parametro para definir donde vamos a guardar la ruta
        this.image = new Image();
        this.image.src = imageSrc;

        //Esta variable aumentara de manera separada cada instancia que la modifique ya que por defecto tiene el tamaño de imagen original
        this.scale = scale;//Multiplicara al ancho y al alto de la imagen

        //Con esta variable indicamos cuantos frames tiene la instancia de imagen para asi hacer las divisiones y poder animarla
        this.framesMax = framesMax; //Si solo tiene un frame por defecto sera 1 y no hay necesidad que modificar esta variable

        //Esta variable ira cambiando la posicion en X del sprite y por defecto es 0 si solo hay una imagen ya que la posicion en x inicial sera de 0
        this.framesCurrent = 0;

        //Esta variable indica cuantos frames han transcurrido iniciando con 0
        this.framesElapsed = 0

        //Esta variable indica cuantos frames vamos a mantener, es decir, que va a pasar a otro frame si han transcurrido 10 es decir no pasamos de frames hasta que llegue a lo frames que hemos mantenido, eso lo indicamos aqui
        this.framesHold = 5 //Pasara de frame cada X frames transcurridos

        //Esta variable compensa la posicion de nuestra imagen para poder moverla y tener una deteccion de colisiones optima
        this.offset = offset; //Comienza con un valor prederteminado para que no sea undefined al compensar esta imagen en X y en Y para luego darle unos valores


    }
    //Metodo el cual pondra el sprite a nuestro jugador
    draw() {
       
        this.ctx.drawImage(
            this.image,
            //Y estos framesCurrent avanzara hasta los framesMax que son los frames que tiene la imagen y de ahi repetira el patron
            this.framesCurrent * (this.image.width / this.framesMax),//Aqui calculamos lo que ira avanzando en el sprite segun el ancho real de la primera imagen comenzando en 0 porque es la primera imagen y para ir a la siguiente se tendra que pasar toda la primera imagen y eso lo hacemos diciendo que el nuevo x inicial sera de el ancho de la imagen
            0,
            (this.image.width / this.framesMax),//Aqui dividimos la imagen segun los frames que tenga esta imagen
            this.image.height,

            //Esta seria la imagen completa arriba esta el recorte de esta imagen, es decir lo que mostraremos de la imagen
            this.position.x - this.offset.x,//Aqui compensamos tanto a X como Y para poder mover la imagen y posicionarla como tiene que ir
            this.position.y - this.offset.y, 
            (this.image.width/ this.framesMax)* this.scale, //Aqui le damos el ancho a la imagen segun el corte de la imagen que hicimos anteriormente
            this.image.height * this.scale
        )
    }
    animateFrames(){
        //Frames transcurridos
        this.framesElapsed++

        //Con este if le indicamos que si el resto de los frames transcurridos entre los frames que vamos a mantener es igual 0 entonces es que en mi imagen pasara de frame por lo que la animacion sera mas lenta
        if(this.framesElapsed % this.framesHold === 0){//En este caso le pusimos cada X framesTranscurridos es que en mi imagen pasaras de frames para que asi no sea tan rapido

            //Aqui animamos nuestro sprite ya que ira pasando entre los diferentes frames del sprite pero solo hasta los frames totales que tiene nuestra imagen
            if(this.framesCurrent < this.framesMax - 1){//Al restarle menos 1 indicamos que ya que los framesMax por defecto es 1 y esto hace que pase al menos una vez por aqui y deje en negro las imagenes que solo tienen un frame e itera una vez adicional, lo arreglamos con el menos 1
                this.framesCurrent++
            }else{
                this.framesCurrent = 0
            }
            
        }
    }

    //Metodo el cual se va actualizar constantemente y animara a nuestro jugador
    update() {
        this.draw()
        this.animateFrames()        
    }
}
//Heredamos de la clase Sprite para poder usar su metodo draw pero para eso tuve que pasar todos lo parametros que esta clase no tenia y tambien llamamos a su contructor para heredar conrrectamente esto se hace dentro de nuestro contructor
export class Fighter extends Sprite{
    //Mejor es meter todos los parametros como si fueran uno y esto se logra con un objeto donde no importa el orden en el cual los declaremos en cambio si lo hacemos de manera normal habra que ponerlos en orden y es mas engorroso asi mismo propenso a errores
    constructor({
        canvas, 
        position, 
        velocity, color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,  
        offset = {x:0, y:0},
        sprites, 
        attackBox = {offset:{}, width:undefined, height:undefined }  }) {
        //Aqui pasamos los parametros del padre lo cuales seran configurados en esta clase hija
        super({
            canvas,
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        });
        this.ctx = this.canvas.getContext('2d');
        //Posicion de nuestro jugador
        // this.position = position

        //Indicara el moviemiento de nuestro jugador
        this.velocity = velocity
        //La gravedad es el aumento de la velocidad a traves del tiempo haciendo asi un efecto como la vida real 
        this.gravity = 0.7
        //Altura y ancho de nuestros jugadores
        this.height = 150
        this.width = 50
        //Ultima tecla presionada
        this.lastKey
        //Color de la caja de los jugadores
        this.color = color

        //Arma de ataque para nuestros jugadores
        this.attackBox = {
            position: {//Aqui nos aseguramos de que nuestro attackBox siga la posicion de nuestro jugador
                x: this.position.x,
                y: this.position.y
            },
            offset:attackBox.offset,//Esta variable es para compensar y modificar desde esta variable nuestro attackBox lo hacemos directamen en el update para modificar e ir moviendose con el jugador
            width: attackBox.width,
            height: attackBox.height

        }

        //Variable boolean que indicara true cuando el jugador ataque 
        this.isAttacking = false
        //Esta sera la vida del jugador la que hara disminuir su barra de vida
        this.health = 100

        this.framesCurrent = 0;
        this.framesElapsed =  0;
        this.framesHold  = 5;

        //Este objeto contendra todos lo sprites del jugador para darle las diferentes funcionalidades
        this.sprites = sprites
        //Aqui vamos a recorrer este objeto el cual guarda los diferentes sprites de nuestro jugador
        for(let i in this.sprites){
            //Aqui añadimos le añadimos una propiedad a cada objeto dentro de este objeto sprites
            sprites[i].image = new Image();//Añadimos esta propiedad para definir que cada objeto sera una imgen de JavaScript
            sprites[i].image.src = sprites[i].imageSrc;//Aqui igualamos la ruta de esa imagen a la que me pasen dentro del objeto

            //Esto se repetira con cada objeto Sprite de nuestro objeto Sprites
        }
        // console.log(this.sprites);


        //Esta variable es la que habilitara si puede seguir animando al jugador ya que si muere sera true y este no podra seguir animado
        this.dead = false


    }

    //Metodo el cual se va actualizar constantemente
    //Para el moviemiento de nuestro jugador
    update() {
        this.draw()
        //Llamamos al metodo de la clase padre que anima el sprite
        if(!this.dead){//Cuando algun jugador muera dejara de animarlo para que asi no repita los frames de su muerte seguidament
            this.animateFrames()
        }
        //Aqui decimos a las attackBox que se muevan segun se mueva el jugador y tambien podemos cambiarle su posicion en la cual estara frente al jugador
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y


        //Pintando nuestro attackBox para poder modificar su posicion con respecto al jugador
        // this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        //Pintando el cuadro de los jugadores para saber cuanto compensarlo segun el jugador
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Aqui nos aseguramos de que la posicion del jugador se vea influenciada por la velocidad que por defecto comenzara en 0, es decir que no se movera, pero tambien podemos modificar para que se mueva en y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //Con este condicional sacamos la parte inferior de nuestro jugador que si es igual o mayor a la altura del canvas entonces ese sera el tope, es decir que llego al piso
        if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 87) {
            this.velocity.y = 0
            //Esto es para que no haga una especie de destello al caer sacamos la altura en la que el jugador se de tiene y la ponemos un poco por enciame para asi detener la caida del jugador y vuelva a estar inactivo sin provocar ningun destello
            this.position.y = 339
            console.log(this.position.y);
        } else this.velocity.y += this.gravity //Aqui logramos que el jugador si esta en el aire caiga solo gracias a la gravedad por lo que la velocidad aumentara con la gravedad a traves del tiempo hasta tocar el piso y se detendra


    }

    //Metodo el cual se activara cuando el jugador pulse la tecla de atacar
    attack() {
        this.isAttacking = true
        this.switchSprites('attack1')
    }

    //Metodo que realiza la animacion que recibe un ataque y a la vez baja la vida del jugador cuando esta vida llegue a 0, es decir muera este lo que hara sera hacer la animacion de su muerte
    takeHit(){
        // this.health -= 12.5
        if(this.health <= 0){
            this.switchSprites('death')
        }else{
            this.switchSprites('takeHit')
        }
    }

    switchSprites(sprite){
        //Prioridad de sprites

        //Prioridad maxima a la muerte del jugador
        if(this.image === this.sprites.death.image ){
            if(this.framesCurrent === this.sprites.death.framesMax - 1){
                this.dead = true
            }

            return
        }



        //Aqui nos aseguramos de que el sprite del ataque se realice en su totalidad y solo pase por todo el sprite para luego pasar a otro sprite, indicando esto cuando la imagen sea igual a la imagen del sprite y si el framesCurrent pasa de los frames maximos entonces ahi no aseguramos de que solo de una vuelta a todo el sprite para asi pasar a otro
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1){
            return
        }

        //Damos mas prioridad al recibir un ataque para que cuando reciba el ataque este realice la animacion
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1){
            return
        }




        switch (sprite) {

            case 'idle':
                //Con este if nos aseguramos de que la imagen que estaba sea diferente y sino lo es sigo con esa imagen pero si lo es entonces quedate con esta imagen y solo pasara una vez
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    //Definimos aqui que el framesCurrent sea 0 para evitar parpadeos ya que el framesCurrent puede estar ya en otro numero al venir del otro sprite y aqui nos aseguramos de eso
                    this.framesCurrent = 0
                }
                
            break;

            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
            break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
            break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
            break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
            break;
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
            break;
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
            break;
        }
    }

}

export function armaColision({arma1, arma2}) {
    return (arma1.attackBox.position.x + arma1.attackBox.width >= arma2.position.x && arma1.attackBox.position.x <= arma2.position.x + arma2.width && arma1.attackBox.position.y + arma1.attackBox.height >= arma2.position.y && arma1.attackBox.position.y <= arma2.position.y + arma2.height)
}





