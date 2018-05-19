<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class UserControllerTest extends DefaultWebTestCase
{
    public function testCreateUserTest() {
        $client = $this->getAdminClient();

        // Old password missing
        $client->request(
            'POST',
            '/user/change_pwd',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"pwd_new":"admin"}'
        );
        $this->assertEquals($client->getResponse()->getStatusCode(), 422);

        // New password missing
        $client->request(
            'POST',
            '/user/change_pwd',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"pwd_old": "admin"}'
        );
        $this->assertEquals($client->getResponse()->getStatusCode(), 422);

        // New password too short
        $client->request(
            'POST',
            '/user/change_pwd',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"pwd_new":"admin", "pwd_old": "xy"}'
        );
        $this->assertEquals($client->getResponse()->getStatusCode(), 422);

        // Old password wrong
        $client->request(
            'POST',
            '/user/change_pwd',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"pwd_old": "admin_wrong", "pwd_new":"admin_wrong"}'
        );
        $this->assertEquals($client->getResponse()->getStatusCode(), 422);


        // Should work
        $client->request(
            'POST',
            '/user/change_pwd',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"pwd_old": "admin", "pwd_new":"admin"}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }
}