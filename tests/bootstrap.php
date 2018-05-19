<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 19.05.2018
 * Time: 02:27
 */
if (isset($_ENV['BOOTSTRAP_CLEAR_CACHE_ENV'])) {
    // executes the "php bin/console cache:clear" command
    passthru(sprintf(
        'php "%s/../bin/console" cache:clear --env=%s --no-warmup',
        __DIR__,
        $_ENV['BOOTSTRAP_CLEAR_CACHE_ENV']
    ));
}

passthru(sprintf('php %s/../bin/console doctrine:database:drop --if-exists --force', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:database:drop --if-exists --force', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:database:create', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:schema:update --force', __DIR__));
passthru(sprintf('php %s/../bin/console doctrine:fixtures:load --no-interaction', __DIR__));

require __DIR__.'/../vendor/autoload.php';