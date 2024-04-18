/*Programa en el que el usuario tiene marcar tres variables de si son verdadero (V) o falso (F), en el cual
esos valores pasaran por una compuerta logica y te indicara si el resultado es verdadero o falso*/

#include <iostream>
#include <stdio.h>

int main(){
	int numero, p, q, r, comp_and, comp_nand, comp_or, comp_nor;
	
	printf("Marque en tres variables si son verdadero (V) o falso (F)");
	printf("\nSiendo verdadero (1) y falso (0)\n");
	
	printf("\nIndique que compuerta de tres entradas quieres utilizar\n\n");
	printf("\n1. Compuerta AND");
	printf("\n2. Compuerta NAND");
	printf("\n3. Compuerta OR");
	printf("\n4. Compuerta NOR\n");
	scanf("%d", &numero);
	
	
		
	switch(numero){
		
		case 1:
			printf("\nMarque el valor de la primera variable entre 0 y 1: ");
			scanf("%d", &p);
			printf("\nMarque el valor de la segunda variable entre 0 y 1: ");
			scanf("%d", &q);
			printf("\nMarque el valor de la tercera variable entre 0 y 1: ");
			scanf("%d", &r);
			
			comp_and= p * q * r;
			
			if(comp_and == 1){
				printf("\nEl valor final despues de pasar por la compuerta es Verdadero (V)");
			}else{if(comp_and == 0){
				printf("\nEl valor final despues de pasar por la compuerta es Falso (F)");
			}else{
				printf("\nEl valor no se puede calcular por que el numero que marco no esta dentro del rango establecido");
			}
				}
		break;
		
		case 2: 
			printf("\nMarque el valor de la primera variable entre 0 y 1: ");
			scanf("%d", &p);
			printf("\nMarque el valor de la segunda variable entre 0 y 1: ");
			scanf("%d", &q);
			printf("\nMarque el valor de la tercera variable entre 0 y 1: ");
			scanf("%d", &r);
			
			comp_nand= p * q * r;
			
			if(comp_nand == 0){
				printf("\nEl valor final despues de pasar por la compuerta es Verdadero (V)");
			}else{if(comp_nand == 1){
				printf("\nEl valor final despues de pasar por la compuerta es Falso (F)");
			}else{
				printf("\nEl valor no se puede calcular por que el numero que marco no esta dentro del rango establecido");
			}
				}
		break;
		
		case 3:
			printf("\nMarque el valor de la primera variable entre 0 y 1: ");
			scanf("%d", &p);
			printf("\nMarque el valor de la segunda variable entre 0 y 1: ");
			scanf("%d", &q);
			printf("\nMarque el valor de la tercera variable entre 0 y 1: ");
			scanf("%d", &r);
			
			comp_or= p + q + r;
			
			if((comp_or >= 1) && (comp_or < 4)){
				printf("\nEl valor final despues de pasar por la compuerta es Verdadero (V)");
			}else{if(comp_or == 0){
				printf("\nEl valor final despues de pasar por la compuerta es Falso (F)");
			}else{
				printf("\nEl valor no se puede calcular por que el numero que marco no esta dentro del rango establecido");
			}
				}
		break;
		
		case 4: 
			printf("\nMarque el valor de la primera variable entre 0 y 1: ");
			scanf("%d", &p);
			printf("\nMarque el valor de la segunda variable entre 0 y 1: ");
			scanf("%d", &q);
			printf("\nMarque el valor de la tercera variable entre 0 y 1: ");
			scanf("%d", &r);
			
			comp_nor= p + q + r;
			
			if((comp_nor >= 1) && (comp_nor < 4)){
				printf("\nEl valor final despues de pasar por la compuerta es Falso (F)");
			}else{if(comp_or == 0){
				printf("\nEl valor final despues de pasar por la compuerta es Verdadero (V)");
			}else{
				printf("\nEl valor no se puede calcular por que el numero que marco no esta dentro del rango establecido");
			}
				}
		break;
		
		default:
			printf("\nTiene que introducir un valor dentro del rango de 1 y 4 para asi indicar que compuerta desea utilizar");
			break;
		
			
	}
	
	
	return 0;
}

