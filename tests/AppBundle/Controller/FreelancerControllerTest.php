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
    public function testCreateFreelancerTest() {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/freelancers',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1":"Test-Vorname","name2":"Test-Nachname","phone":null,"phone2":null,"email":"test@mail.com","email2":null,"skype":null,"fax":null,"comment":"Teste den Kommentar","created_at":null,"anrede":{"id":1,"name":"Herr"},"date_of_birth":"1981-06-04","correspond_language":null,"company_name":"Test-Firma","address":{"street":"Test-Straße","street2":"Test-Straße2","zipcode":"Test-ZIP","city":"Test-City","country":null},"fl_status":{"id":2,"name":"Kein Interesse"},"fl_rating":{"id":1,"name":"Qualtiät A"},"mothertounge":null,"mothertounge2":null,"nda":{"id":1,"name":"Ja"},"sworn":true,"vat_no":"Test USt.-Nr","vat_payer":true,"tax_id":"Test Steuer ID","fl_payment_type":{"id":2,"name":"PayPal"},"fl_invoicing_type":{"id":2,"name":"Gutschrift"},"bankdetails":"Test Bankverbindung","prices":[{"lng_source":{"id":1,"name":"Englisch"},"lng_target":{"id":2,"name":"UK","main_item":{"id":1,"name":"Englisch"}},"service":{"id":3,"name":"Übersetzung"},"price_unit":{"id":1,"name":"Quellwort"},"price_per_unit":0.2,"currency":{"id":1,"name":"EUR"},"minimum_price":20}],"cat_prices":null,"sectors":[],"cat_tools":[]}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Remove FreelancerPrice
        $newFreelancer = json_decode($content, true);
        unset($newFreelancer['prices'][0]['id']);

        $client->request(
            'POST',
            '/freelancers/' . $newFreelancer['id'],
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($newFreelancer)
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    public function testSearchFreelancersTest() {

        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/freelancers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $freelancerList = json_decode($content, true);
        $freelancerId = $freelancerList['items'][0]['id'];

        $crawler = $client->request('GET', '/freelancers/'.$freelancerId);
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testSearchFreelancersBySearchParameters() {

        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/freelancers/search',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"lng_source": {"id": 1}, "lng_target": {"id": 1}, "fl_status": {"id": 1}, "sector": {"id": 1}, "name": "Test Freelancer Name"}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    public function testDeleteFreelancerTest() {

        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/freelancers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $freelancerList = json_decode($content, true);
        $freelancerId = $freelancerList['items'][0]['id'];

        $crawler = $client->request('DELETE', '/freelancers/'.$freelancerId);
        $this->assertJson($client->getResponse()->getContent());
    }
}