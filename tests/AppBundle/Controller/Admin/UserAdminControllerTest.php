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

class UserAdminControllerTest extends DefaultWebTestCase
{
    public function testCreateUserTest()
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"username": "testuser", "password": "testuser", "email": "testuser@unit.test"}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Remove FreelancerPrice
        $response = json_decode($content);
        $newUser = $response;
        $this->assertTrue(isset($newUser->id) && $newUser->id !== null);

        return $newUser->id;
    }

    /**
     * @depends testCreateUserTest
     */
    public function testFetchAndEditUserTest($userId)
    {
        $client = $this->getAdminClient();

        $client->request(
            'GET',
            '/admin/users/' . $userId
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $response = json_decode($content);
        $user = $response[0];

        $newEmail = "testuser-edited@unit.test";
        $user->email = $newEmail;

        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/' . $userId,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($user)
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $response = json_decode($content);
        $editedUser = $response;
        $this->assertEquals($newEmail, $editedUser->email);

        return $editedUser->id;
    }


    /**
     * @depends testCreateUserTest
     */
    public function testEditUserPasswordTest($userId)
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/' . $userId . '/password',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '"pwd_new": "testuser-pwd-edited"'
        );

        $statusCodee = $client->getResponse()->getStatusCode();
        $this->assertEquals(200, $statusCodee);

        return $userId;
    }


    /**
     * @depends testCreateUserTest
     */
    public function testFetchAndDeleteUserTest($userId)
    {
        // Get user to delete
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/users/' . $userId
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);


        // Delete user
        $client = $this->getAdminClient();
        $client->request(
            'DELETE',
            '/admin/users/' . $userId
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());


        // Test that user is gone
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/users/' . $userId
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $response = json_decode($content);
        $this->assertEmpty($response);
    }
}