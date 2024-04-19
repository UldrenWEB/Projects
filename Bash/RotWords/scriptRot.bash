#!bin/bash

#Script para rotar letras segun la rotacion que indiques

#Variables
abcedario="abcdefghijklmnopqrstuvwxyz"
rotate=$(/bin/cat /home/uldren/Desktop/rot | awk 'NR==1 {print $1}')
textrotate=$(/bin/cat /home/uldren/Desktop/rot | awk 'NR==2 {print}')
numMenos=$(expr $rotate - 1)

#Computo para rotar las letras
l1=${abcedario:${rotate}:1}
l2=${abcedario:${numMenos}:1}
lu1=$(echo "${l1}" | tr '[:lower:]' '[:upper:]')
lu2=$(echo "${l2}" | tr '[:lower:]' '[:upper:]')

echo "${textrotate}" | tr '[A-Za-z]' "[${lu1}-ZA-${lu2}${l1}-za-${l2}]"