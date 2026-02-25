@echo off
echo Starting Git Merge... > git_output.txt
"C:\Program Files\Git\cmd\git.exe" fetch origin main >> git_output.txt 2>&1
"C:\Program Files\Git\cmd\git.exe" merge origin/main --allow-unrelated-histories -m "Merge remote main with unrelated histories" >> git_output.txt 2>&1
echo Git Merge Finished. >> git_output.txt
