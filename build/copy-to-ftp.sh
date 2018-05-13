ftp -inv server23.webgo24.de << EOT
user web96f1 $WERFTNET-BUILD_FTP_KEY
put logs/coveralls-upload.json
bye
EOT