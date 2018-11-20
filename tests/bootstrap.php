<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 19.05.2018
 * Time: 02:27
 */

// executes the "php bin/console cache:clear" command
passthru(sprintf('php "%s/../bin/console" cache:clear --env=test --no-warmup',__DIR__));
passthru(sprintf('php %s/../bin/console doctrine:database:drop --if-exists --force --env=test', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:database:create --env=test', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:schema:update --force --env=test', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:fixtures:load --no-interaction --env=test', __DIR__));

require __DIR__ . '/../vendor/autoload.php';