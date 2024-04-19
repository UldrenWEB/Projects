#Se usa en tu .bashrc o .zshrc para usar esta funcion y el script rotL.sh

#Ejemplo de uso: textrotate -r 13 "Hola mundo"

function textrotate(){
  rotate=13
  text=""

 while getopts "r:" opcion; do
  case $opcion in
    r)rotate=$OPTARG;;
    *)echo "Opción no válida: -$OPTARG"; return 1;;
  esac
done

shift $((OPTIND - 1))
text="$@"

echo -e "$rotate \n$text" > /home/uldren/Desktop/uldren/rot

resultado=$(/home/uldren/Desktop/myscripts/rotL.sh)  

echo ${resultado}
}