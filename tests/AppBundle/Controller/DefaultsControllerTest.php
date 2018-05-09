<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class DefaultsControllerTest extends DefaultWebTestCase
{
    public function testGetDefaults() {

        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/getDefaults');

        $this->assertJson($client->getResponse()->getContent());
    }

    public function testGetUserRoles() {
        $client = $this->getAdminClient();

        $crawler = $client->request('GET', '/getUserRoles');

        $this->assertJson($client->getResponse()->getContent());
    }
}