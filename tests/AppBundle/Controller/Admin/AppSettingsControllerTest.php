<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 20:54
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Settings\AppSettings;
use Tests\AppBundle\DefaultWebTestCase;

class AppSettingsControllerTest extends DefaultWebTestCase
{
    public function testGetAppSettingsId()
    {
        $appSettings = new AppSettings();
        $this->assertEquals(1, $appSettings->getId());
    }

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

    public function testChangeImprintAsAdmin()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/settings/imprint'
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

    public function testChangeImprintAsUser()
    {
        $client = $this->getUserClient();

        $newImprint = "Test for Imprint";

        $client->request(
            'POST',
            '/admin/settings/imprint',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"imprint": "' . $newImprint . '"}'
        );
        $this->assertEquals(403, $client->getResponse()->getStatusCode());
    }

}