<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class HomeControllerTest extends DefaultWebTestCase
{
    /**
     * Test that user is redirected to login page when starting app
     */
    public function testIndexAction() {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');

        $this->assertContains('index.html', $client->getResponse()->getContent());
    }

    /**
     * Test that login page is shown when user navigates to login
     */
    public function testLoginAction() {

        $client = static::createClient();
        $crawler = $client->request('GET', '/login');

        $this->assertContains('index.html', $client->getResponse()->getContent());
    }

}