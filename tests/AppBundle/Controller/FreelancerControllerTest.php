<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Tests\AppBundle\DefaultWebTestCase;

class FreelancerControllerTest extends DefaultWebTestCase
{
    public function testSearchFreelancersTest() {

        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/freelancer/searchFreelancers');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $freelancerList = json_decode($content, true);
        $freelancerId = $freelancerList['items'][0]['id'];

        $crawler = $client->request('GET', '/freelancer/'.$freelancerId);
        $this->assertJson($client->getResponse()->getContent());
    }
}