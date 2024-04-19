'use strict'

export default class Matrix {
    constructor(dimension) {

        this.dimension = dimension;
        this.matrix = [];
        this.matrixIdent = [];
        this.vector = [];
        this.coeficientes = [];



        //Creando la matriz 
        for (var i = 0; i < this.dimension; i++) {
            for (var j = 0; j < this.dimension; j++) {
                this.matrix[i] = new Array();
                this.matrixIdent[i] = new Array();

            }
        }

        // Creando la matriz de los terminos independientes y la matriz que contendra los resultados
        for (var i = 0; i < this.dimension; i++) {
            this.vector = new Array();
            this.coeficientes = new Array();
            for (var j = 0; j < this.dimension; j++) {
                this.matrix[i][j] = 0;

            }
        }


        for (var i = 0; i < this.dimension; i++) {
            this.coeficientes[i] = 0;
            console.log(this.coeficientes[i])
        }

        // for (var i = 0; i < this.dimension; i++){
        //         this.vector[i] = parseInt(prompt("Introduce los coeficientes"))
        // }

        //Creando la matriz identidad
        for (var i = 0; i < this.dimension; i++) {
            for (var j = 0; j < this.dimension; j++) {
                if (i === j) {
                    this.matrixIdent[i][j] = 1;
                    // this.diagonal = this.matrix[i][j];


                } else {
                    this.matrixIdent[i][j] = 0;
                }
            }
        }

     
    }

    sacarArray(arrays) {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                this.matrix[i][j] = arrays[i][j];
            }
        }
    }

    sacarIndpendientes(arrayVector) {
        for (var i = 0; i < this.dimension; i++) {
            this.vector[i] = arrayVector[i] 
        }

    }

    sacarUnos() {
        for (var i = 0; i < this.dimension; i++) {

            //Aqui sacamos el pivote, es decir los numeros en la diagonal el cual convertiremos a uno
            var pivote = this.matrix[i][i];
            for (var k = 0; k < this.dimension; k++) {
                //Aqui dividimos toda la primera fila por ese pivote que hicimos uno y tambien se lo aplicamos a la matriz identidad

                this.matrix[i][k] = this.matrix[i][k] / pivote;
                this.matrixIdent[i][k] = this.matrixIdent[i][k] / pivote;

            }
            for (var j = 0; j < this.dimension; j++) {
                if (i != j) {
                    var aux = this.matrix[j][i];
                    for (var k = 0; k < this.dimension; k++) {

                        this.matrix[j][k] = this.matrix[j][k] -aux * this.matrix[i][k];

                        this.matrixIdent[j][k] = this.matrixIdent[j][k] - aux * this.matrixIdent[i][k];


                    }
                }
            }
        }
    }

    sacarCoeficientes() {

        for (var i = 0; i < this.dimension; i++) {

            for (var j = 0; j < this.dimension; j++) {

                //Aqui multiplicamos la matriz inversa con los terminos independientes y darian los coeficientes

                isNaN(this.coeficientes[i]) ?
                    this.coeficientes[i] = 'La ecuacion no es valida'
                    :
                    this.coeficientes[i] = this.coeficientes[i] + this.matrixIdent[i][j] * this.vector[j]


            }
        }

        return this.coeficientes;
    }

}