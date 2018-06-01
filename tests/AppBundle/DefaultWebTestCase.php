<?php

/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 02.05.2018
 * Time: 00:03
 */
namespace Tests\AppBundle;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultWebTestCase extends WebTestCase
{
    public function getAdminClient()
    {
        $client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin',
            'PHP_AUTH_PW'   => 'admin',
        ));

        return $client;
    }

    public function getUserClient()
    {
        $client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'user',
            'PHP_AUTH_PW'   => 'user',
        ));

        return $client;
    }
}