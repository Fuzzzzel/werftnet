ftp -inv server23.webgo24.de << EOT
quote USER web96f1
quote PASS $WERFTNET_BUILD_FTP_KEY
put logs/coveralls-upload.json
bye
EOT