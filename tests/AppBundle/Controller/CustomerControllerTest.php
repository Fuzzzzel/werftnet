<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class CustomerControllerTest extends DefaultWebTestCase
{
    public function testSearchCustomersTest() {

        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/customer/searchCustomers');

        echo $client->getResponse()->getContent();
        $this->assertJson($client->getResponse()->getContent());
    }
}