/*Escriba un programa que calcule las soluciones de una ecuacion de segundo grado de la forma
ax^2 + bx + c = 0
Teniendo en cuenta la ecuacion de segundo grado*/

#include <iostream>
#include <stdio.h>
#include <math.h>

int main(){
	float a, b, c, x1, x2;
	
	printf("Escriba el valor de a: ");
	scanf("%f", &a);
	printf("Escriba el valor de b: ");
	scanf("%f", &b);
	printf("Escriba el valor de c: ");
	scanf("%f", &c);	
	
	x1= (-b + sqrt(pow(b, 2) - 4 * a * c)) / 2 * a;
	x2= (-b - sqrt(pow(b, 2) - 4 * a * c)) / 2 * a;
	
	printf("\nSu ecuacion de segundo grado es: %.0fx^2 + %.0fx + %.0f = 0\n",a, b, c);
	printf("\nEl resultado de esa ecuacion de segundo grado es x1 y x2 que serian\n");
	printf("\nx1 es: %.2f", x1);
	printf("\nx2 es: %.2f", x2);
	
	
	
	
	
	
	return 0; 
}