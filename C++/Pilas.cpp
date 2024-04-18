#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>


typedef struct persona{
	char nombre[30];
	char apellido[30];
	int cedula; 
	int edad;
	char sexo[10];
}Persona;

typedef struct nodo{
	Persona *dato;
	struct nodo *Siguiente;
}Nodo;

typedef struct pila{
	Nodo *tope;
	int total;
}Pila;

//Prototipos de los metodos
Persona *crearPersona(char nombre[30], char apellido[30], int cedula, int edad, char sexo[10]);
Nodo *crearNodo(Persona *persona);
Pila *crearPila();
int estaVacia(Pila *pila);

void insertar(Pila *pila, Nodo *nodo);
void imprimir(Pila *pila);
//Prototipos de los metodos


int main(){
	Pila *p;
	p = crearPila();
	
	insertar(p, crearNodo(crearPersona("Carlos","Rodriguez", 13270323, 45, "Femenino")));
	insertar(p, crearNodo(crearPersona("Pedrito","Diaz", 11086106, 51, "Masculino")));
	insertar(p, crearNodo(crearPersona("Grabiel","Marquez", 38470667, 72, "Femenino")));
	insertar(p, crearNodo(crearPersona("Maximiliano","Tumount", 30026952, 18, "Femenino")));
	insertar(p, crearNodo(crearPersona("Dubront","Verrimont", 29352779, 21, "Femenino")));
	insertar(p, crearNodo(crearPersona("Gian","Franco", 29691969, 82, "Masculino")));
	insertar(p, crearNodo(crearPersona("Julian","Pieronno", 30333753, 22, "Femenino")));
	imprimir(p);
	return 0;
}

Persona *crearPersona(char nombre[30], char apellido[30], int cedula, int edad, char sexo[10]){
	Persona *aux = (Persona*) malloc(sizeof(Persona));
	strcpy(aux->nombre, nombre);
	strcpy(aux->apellido, apellido);
	aux->cedula = cedula;
	aux->edad = edad;
	strcpy(aux->sexo, sexo);
	return aux;
}

Nodo *crearNodo(Persona *persona){
	Nodo *aux = (Nodo * ) malloc(sizeof(Nodo));
	aux->dato = persona;
	aux->Siguiente = NULL;
};

Pila *crearPila(){
	Pila *aux = (Pila *) malloc(sizeof(Pila));
	aux->tope = NULL;
	aux->total = 0;
	return aux;
}
//1: Si ella esta vacia, y 0: Si ella no esta vacia 
int estaVacia(Pila *pila){
	if(pila->total == 0){
		return 1;
	}else{
		return 0;
	}
}

void insertar(Pila *pila, Nodo *aux){
	if (estaVacia(pila)){
		pila ->tope = aux;
	}else{
		aux->Siguiente = pila->tope;
		pila->tope = aux;
	}
	
	pila->total++;
}

void imprimir(Pila *pila){
	Nodo *aux = pila ->tope;
	Persona *c;
	while(aux != NULL){
		c = aux->dato; 
		printf("%s %s %d %d %s \n", c->nombre, c->apellido, c->cedula, c->edad, c->sexo);
		aux = aux->Siguiente;	
	}
	
}







