<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 20:54
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\User;
use Tests\AppBundle\DefaultWebTestCase;

class EventListenerControllerTest extends DefaultWebTestCase
{
    public function testOnLogoutSuccess()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/logout'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

}