/*Ejemplo de Recursividad

Este programa tiene un funcion recursiva, el cual crea un bucle del cual no sale hasta que el usuario 
ingrese una tecla numerica*/

#include<iostream>
#include<stdlib.h>

void comprobar(char r);

int main(){
    char c;
	printf("Ingrese un numero : ");
    scanf("%s",&c);
    comprobar(c);
    printf("\nEl programa ha finalizado.");
}

void comprobar(char r){
	
   	int n=int(r);
    if (n>=48 and n<=57) {
        printf("\nCorrecto, la tecla pulsada es un numero.");
    }else{
        printf("Incorrecto, la tecla pulsada NO es un numero.");
        printf("\nVuelve a pulsar un numero : ");
        scanf("%s",&r);
        comprobar(r);
		}
}