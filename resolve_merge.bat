@echo off
echo Resolving conflicts with 'ours' strategy... > resolve_output.txt
"C:\Program Files\Git\cmd\git.exe" checkout --ours . >> resolve_output.txt 2>&1
"C:\Program Files\Git\cmd\git.exe" add . >> resolve_output.txt 2>&1
"C:\Program Files\Git\cmd\git.exe" commit -m "Merge remote main with unrelated histories, preferring local changes" >> resolve_output.txt 2>&1
echo final status: >> resolve_output.txt
"C:\Program Files\Git\cmd\git.exe" status >> resolve_output.txt 2>&1
echo Done. >> resolve_output.txt
