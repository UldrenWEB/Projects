#include <stdio.h>
#include <stdlib.h>

typedef struct nodo{
	int dato;
	struct nodo* siguiente;
	struct nodo* anterior;
	
	
}NODO;

NODO * CrearNodo (int dato);

int main(){
	
	return 0;
}

NODO * CrearNodo (int dato){
	NODO *nuevo = NULL;
	nuevo *(NODO*) malloc(sizeof(NODO));
}
