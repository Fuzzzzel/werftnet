ftp -inv server23.webgo24.de << EOT
user web96f1 $1
pass
put logs/coveralls-upload.json
bye
EOT