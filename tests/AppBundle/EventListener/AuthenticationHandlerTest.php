<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 20:54
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Controller\AuthenticationController;
use AppBundle\Entity\User\User;
use Tests\AppBundle\DefaultWebTestCase;

class AuthenticationHandlerTest extends DefaultWebTestCase
{
    public function testDummyMethodsForLoginLogout() {
        // These methods only exist to create a route by annotations
        $authenticationController = new AuthenticationController();

        $authenticationController->loginCheckAction();
        $authenticationController->logoutAction();
    }

    public function testOnAuthenticationSuccess()
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/login_check',
            array('_username' => 'admin', '_password' => 'admin', '_remember_me' => true)
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    public function testOnAuthenticationFailure()
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/login_check',
            array('_username' => 'admin', '_password' => 'Wrong Password', '_remember_me' => true)
        );

        $content = $client->getResponse()->getContent();
        $this->assertEquals(401, $client->getResponse()->getStatusCode());

        // Two more requests to get into 3 times wrong login
        $client->request(
            'POST',
            '/login_check',
            array('_username' => 'admin', '_password' => 'Wrong Password', '_remember_me' => true)
        );

        $client->request(
            'POST',
            '/login_check',
            array('_username' => 'admin', '_password' => 'Wrong Password', '_remember_me' => true)
        );
    }

}