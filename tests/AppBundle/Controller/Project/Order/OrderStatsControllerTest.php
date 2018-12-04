<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 10:59
 */

namespace Tests\AppBundle\Controller\Project\Order;

use http\Env\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\AppBundle\DefaultWebTestCase;
class OrderStatsControllerTest extends DefaultWebTestCase
{
    public function testSearchOrdersBySearchParameters() {

        // Search order
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orderstats/createdlast',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }
}