#include<stdio.h>
#include <stdlib.h>
#include<string.h>

typedef struct persona{
	char name[20];
	int cedula;
}Persona;

struct nodo {
    Persona data;
    struct nodo *sig;
};

struct cola {
    struct  nodo *primero, *ultimo;
};


//Prototipo de los metodos


struct nodo *crearNodo(Persona data);
struct cola *crearCola();
Persona *crearPersona(char name[20], int cedula);
void enQueue(Persona data, struct cola**c);
Persona deQueue(struct cola** c);
void mostrar(struct cola **c);

//Prototipo de los metodos



int main (){
    struct cola *c = crearCola();
    Persona *uldren = crearPersona("Uldren", 30333753);
    Persona *sol = crearPersona("Sol", 13270323);
    Persona *juana = crearPersona("Juana", 3847667);
    Persona *gabi = crearPersona("Gabriela", 30952036);
    Persona *iliana = crearPersona("Iliana", 29345678);
    
    enQueue(*uldren, &c);
    enQueue(*sol, &c);
    enQueue(*juana, &c);
    enQueue(*gabi, &c);
    enQueue(*iliana, &c);

    mostrar(&c);
    deQueue(&c);
    deQueue(&c);
    deQueue(&c);
    
    printf("\n------------------\n");

    mostrar(&c);

    return 0;
};





struct  nodo *crearNodo (Persona data){
    struct nodo * nuevo =  (struct nodo*) malloc(sizeof(struct nodo));

    nuevo->data = data;
    nuevo->sig  = NULL;
    
    return nuevo;
    
};

struct cola *crearCola(){
    struct cola *c = (struct cola*)  malloc(sizeof (struct cola));
    c ->primero = c->ultimo=NULL;
    return  c;
};

Persona *crearPersona(char name[20], int cedula){
	Persona *aux = (Persona*) malloc(sizeof(Persona));
	
	strcpy(aux->name, name);
	aux->cedula = cedula;
	
	return aux;
}


void  enQueue (Persona data, struct cola** c){

    struct nodo* nuevo =  crearNodo(data);
    if((*c)->primero == NULL){
        (*c)->primero = (*c )->ultimo = nuevo;
    return;
    };

    //si la cola no esta vacia
    (*c)->ultimo->sig = nuevo;
    (*c) ->ultimo= nuevo;
}


Persona deQueue( struct cola** c){
	
//	Aqui esta el error pero sin esto no me lee los primeros datos

//     if( (*c)->primero == NULL){
//		return;
//	 }

     //Que ocurrre si la cola no esta vacia
     struct nodo *eliminado = (*c)->primero;
      Persona data = eliminado->data;

      //Eliminando el nodo de la cola
      (*c) ->primero = eliminado->sig;

      if((*c)->primero==NULL){
        (*c)->ultimo = NULL;
      }

      free(eliminado);

      return data;
}

void mostrar ( struct cola ** c){
    if ( (*c )->primero==NULL){
    	return;
	}
	
	
    //Si no esta vacia
    printf("Primera persona: %s \n  Ultima persona: %s \n",(*c)->primero->data.name, (*c)->ultimo->data.name );


    struct nodo *actual  = (*c)->primero;

    while(actual){
    	
    	printf ("\n----------------------\n");
    	
        printf ("%s\n", actual->data.name);
        printf("%d\n", actual->data.cedula);
        actual = actual ->sig;
        
        printf ("\n----------------------\n");
    }


}


