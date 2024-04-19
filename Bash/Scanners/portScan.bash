#!/bin/bash

function ctrl_c(){
  echo -e "\n[!] Saliendo...\n"
  exit 1
}

#Ctrl+C
trap ctrl_c INT

#Si el codigo de estado es erroneo ejecuta el AND 
for port in $(seq 1 65535); do
  (echo ' ' > /dev/tcp/127.0.0.1/$port) 2>/dev/null && echo "[+] $port - OPEN" &
done; wait
