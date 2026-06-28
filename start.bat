@echo off

cd /d D:\dev\qpm-quest

start http://localhost:8000

python -m http.server 8000