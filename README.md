[![Build Status](https://travis-ci.com/Fuzzzzel/werftnet.svg?branch=master)](https://travis-ci.com/Fuzzzzel/werftnet)
[![Coverage Status](https://coveralls.io/repos/github/Fuzzzzel/werftnet/badge.svg?branch=master)](https://coveralls.io/github/Fuzzzzel/werftnet?branch=master)
  
# werftnet  
  
A simple tool to manage your translators and customers. Simple project management to be added soon.  
  
* Frontend: Angular 4, Bootstrap 3.4  
* Backend: PHP 7.1, Symfony 3.4, Doctrine  
  
## Installation instructions  
### Environment setup  
`sudo apt-get install apache2 libapache2-mod-php7.1 php7.1 php7.1-mysql mysql-server`  
`sudo a2enmod rewrite`  
`sudo apt-get install php-xml php7.1-mbstring`  
  
### Create DB and user (for MySQL)  
`CREATE USER your_user@localhost identified by 'YOUR_PASSWORD';`  
`CREATE DATABASE YOUR_DATABASE_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`  
`GRANT ALL ON YOUR_DATABASE_NAME.* TO your_user@localhost` 

An alternative is to use the following command after cloning the repository and calling `composer update`:       
`php bin/console doctrine:database:create`
  
### Clone repository and init app  
`sudo apt-get install composer`  
`sudo git clone https://github.com/Fuzzzzel/werftnet.git`  
`sudo composer install`  
`sudo composer update`  
  
You will be asked for your DB and mail credentials now. Mail is not used yet.  
  
Set up virtual host in apache --> Change DocumentRoot to www folder in repository  
`chown -R www-data:www-data YOUR_REPOSITORY_FOLDER`  
  
### Init Database  
Load base values into your app so some basic information and the default user admin/admin is there (you can change them later).  
`php bin/console doctrine:schema:update --force`  
`php bin/console doctrine:fixtures:load` (Run only to init! This operation purges your database!)  
