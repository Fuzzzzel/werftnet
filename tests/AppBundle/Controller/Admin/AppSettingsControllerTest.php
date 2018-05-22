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

class AppSettingsControllerTest extends DefaultWebTestCase
{
    public function testGetAppSettings()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/settings'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $settings = json_decode($content);
        $this->assertEquals(1, $settings->id);
    }

    public function testChangeImprint()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/settings'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $newImprint = "Test for Imprint";

        $client->request(
            'POST',
            '/admin/settings/imprint',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"imprint": "' . $newImprint . '"}'
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());


        $client->request(
            'GET',
            '/admin/settings'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $newSettings = json_decode($content);
        $this->assertEquals("Test for Imprint", $newSettings->imprint);
    }

}