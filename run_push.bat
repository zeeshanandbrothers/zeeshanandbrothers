@echo off
echo Final Push attempt... > push_output.txt
"C:\Program Files\Git\cmd\git.exe" push origin main >> push_output.txt 2>&1
echo Push Command Finished. >> push_output.txt
