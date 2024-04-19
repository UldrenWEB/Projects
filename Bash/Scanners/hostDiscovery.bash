#!/bin/bash

#Variables Globales
declare -a redes=(3 10)

echo -e "\n[+] Enumerando los host activos en las redes -> ${redes[@]}\n"

for i in ${redes[@]}; do
  for host in $(seq 0 255); do
    (timeout 0.4 bash -c "ping -c 1 192.168.$i.$host") &>/dev/null && echo "[+] Host 192.168.$i.$host - ACTIVE" &
  done
done; wait
