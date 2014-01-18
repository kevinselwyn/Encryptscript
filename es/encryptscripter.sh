#!/bin/bash

# Searches for all .js files in the current directory and generates
# Encryptscript .es files as well as Encryptscript compatible .php files

KEY=0102030405060708090a0b0c0d0e0f10
IV=0102030405060708090a0b0c0d0e0f10

for f in *.js
do
	cat ${f} | openssl enc -aes-128-cbc -K ${KEY} -iv ${IV} | openssl enc -base64 -A -out ${f%%.*}.es
	cp encryptscripter.php ${f%%.*}.php
done