<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 20:54
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Tests\AppBundle\DefaultWebTestCase;

class UserAdminControllerTest extends DefaultWebTestCase
{
    public function testFetchAllUsers()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/users'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

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

        // Assert returned user has an id
        $response = json_decode($content);
        $newUser = $response;
        $this->assertTrue(isset($newUser->id) && $newUser->id !== null);

        return $newUser;
    }

    public function testCreateUserDuplicateTest()
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

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testCreateUserNoUsername()
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"username": "", "password": "password", "email": "testuser@unit.test"}'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testCreateUserPasswordTooShort()
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"username": "passwordTooShort", "password": "xyz", "email": "testuser@unit.test"}'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateUserTest
     */
    public function testEditOtherUserThanRoute($user) {
        $client = $this->getAdminClient();
        $otherId = $user->id + 1;

        $client->request(
            'POST',
            '/admin/users/' . $otherId,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($user)
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateUserTest
     */
    public function testFetchAndEditUserTest($user)
    {
        $client = $this->getAdminClient();

        $client->request(
            'GET',
            '/admin/users/' . $user->id
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $response = json_decode($content);
        $user = $response;

        $newEmail = "testuser-edited@unit.test";
        $user->email = $newEmail;

        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/' . $user->id,
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
    public function testEditUserPasswordTest($user)
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/' . $user->id . '/password',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '"pwd_new": "testuser-pwd-edited"'
        );

        $statusCodee = $client->getResponse()->getStatusCode();
        $this->assertEquals(200, $statusCodee);
    }

    /**
     * @depends testCreateUserTest
     */
    public function testEditUserPasswordWithoutId($user)
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/xyz/password',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '"pwd_new": "testuser-pwd-edited"'
        );

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateUserTest
     */
    public function testEditUserPasswordWithNonExistentId($user)
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/99999/password',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '"pwd_new": "testuser-pwd-edited"'
        );

        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateUserTest
     */
    public function testEditUserPasswordTooShortTest($user)
    {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/admin/users/' . $user->id . '/password',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            'xyz'
        );

        $statusCodee = $client->getResponse()->getStatusCode();
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $statusCodee);
    }


    /**
     * @depends testCreateUserTest
     */
    public function testFetchAndDeleteUserTest($user)
    {
        // Get user to delete
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/users/' . $user->id
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);


        // Delete user
        $client = $this->getAdminClient();
        $client->request(
            'DELETE',
            '/admin/users/' . $user->id
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());


        // Test that user is gone
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/users/' . $user->id
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $response = json_decode($content);
        $this->assertEmpty($response);
    }

    public function testDeleteNonExistentUser()
    {
        // Delete non existent user
        $client = $this->getAdminClient();
        $client->request(
            'DELETE',
            '/admin/users/99999'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }
}