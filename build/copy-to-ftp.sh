ftp -inv server23.webgo24.de << EOT
user WERFTNET-web96f1 %WERFTNET-BUILD_FTP_KEY%
put logs/coveralls-upload.json
bye
EOT