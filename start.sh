#!/bin/bash

cd ~/qpm-quest || exit

if pgrep -f "python3 -m http.server 8000" > /dev/null
then
    echo "Servidor ya ejecutándose."
else
    echo "Iniciando servidor..."
    python3 -m http.server 8000 &
    sleep 2
fi

xdg-open http://localhost:8000