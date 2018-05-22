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
    }

    /**
     * @group test
     */
    public function testChangeImprint()
    {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/admin/settings/imprint'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $client->request(
            'POST',
            '/admin/settings/imprint',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"imprint": "Test for Imprint"}'
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());


        $client->request(
            'GET',
            '/admin/settings/imprint'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        echo(json_decode($content));
    }

}