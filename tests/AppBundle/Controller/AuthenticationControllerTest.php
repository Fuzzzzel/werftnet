<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class AuthenticationControllerTest extends DefaultWebTestCase
{
    /**
     * Test that user is redirected to login page when starting app
     * @group failing
     */
    public function testGetLoggedInUser() {
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/get_logged_in_user');

        $this->assertJson($client->getResponse()->getContent());
    }

}