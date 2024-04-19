#!/bin/bash


function ctrl_c(){
   echo -e "\n\n[+] Saliendo...\n"
  tput cnorm; exit 1
}

# Ctrl+C
trap ctrl_c INT

#Variables Globales
declare -a ports=( $(seq 1 65535) )

function checkport(){
  host="$1"
  port="$2"

  (exec 3<> /dev/tcp/$host/$port) 2>/dev/null

  if [ $? -eq 0 ]; then
    echo "[+] Host $host - Port $port (OPEN)"
  fi

  exec 3>&-
  exec 3<&-

}

if [ $1 ]; then
  echo -e "\nEnumerando los puertos del Host $1\n"
  tput civis  
  for i in ${ports[@]}; do
    checkport $1 $i &
  done
  tput cnorm
else
  echo -e "\n[!] Uso: $0 <IP address> \n"
fi

wait
