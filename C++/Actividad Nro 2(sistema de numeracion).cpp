/*Programa para cambiar de sistema decimal a octal, binario o hexadecimal*/

#include<iostream>
#include<stdio.h>
#include<stdlib.h>

int main(){
	int d, i = 0, opcion;
	int octal[50], hex[100], bin[100];
	
	printf("Ingrese un numero en base 10 (decimal): ");
	scanf("%d", &d);
	
	printf("\n\nIndique en que sistema de numeracion desea convertir ese numero decimal");
	printf("\n1.Sistema binario");
	printf("\n2.Sistema octal");
	printf("\n3.Sistema hexadecimal\n");
	scanf("%d", &opcion);
	
	switch(opcion){
		case 1:{
			while(d != 0){
				bin[i]= d % 2;
				d = d / 2;
				i++;
			}
			i--;
			printf("\nResultado en binario: ");
	
			while(i >= 0){
				printf("%d", bin[i]);
				i--;
			}
		
		}break;
			
			
		case 2:{
			while(d >= 8){
				octal[i]=d%8;
				d = d / 8;
				i++;
			}
			printf("\nResultado en octal: ");
			octal[i]= d;
			int j=0;
			for(j=i; j>=0; j--){
				printf("%d", octal[j]);
			}
			
		}break;
			
		case 3:{
			
				while(d != 0){
				hex[i] = d%16;
				d = d/16;
				i++;
			}
			i--;
			printf("\nResultado en hexadecimal: ");
			while(i >= 0){
				switch(hex[i]){
					case 10:
						printf("A");
						break;
					case 11:
						printf("B");
						break;
					case 12:
						printf("C");
						break;
					case 13:
						printf("D");
						break;
					case 14:
						printf("E");
						break;
					case 15:
						printf("F");
						break;
					default:
						printf("%d", hex[i]);
				}
				i--;
				
			}
				}break;
				
			
			default:{
				printf("\nEl numero que marco no esta dentro de las tres opciones disponibles");
				break;
			}
		}
	
	
	return 0;
}

