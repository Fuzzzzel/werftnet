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
            '/freelancer/editFreelancer',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1":"Test-Vorname","name2":"Test-Nachname","phone":null,"phone2":null,"email":"test@mail.com","email2":null,"skype":null,"fax":null,"comment":"Teste den Kommentar","created_at":null,"anrede":{"id":1,"name":"Herr"},"date_of_birth":"1981-06-04","correspond_language":null,"supplier_no":"1","company_name":"Test-Firma","address":{"street":"Test-Straße","street2":"Test-Straße2","zipcode":"Test-ZIP","city":"Test-City","country":null},"fl_status":{"id":2,"name":"Kein Interesse"},"fl_rating":{"id":1,"name":"Qualtiät A"},"mothertounge":null,"mothertounge2":null,"nda":{"id":1,"name":"Ja"},"sworn":true,"vat_no":"Test USt.-Nr","vat_payer":true,"tax_id":"Test Steuer ID","fl_payment_type":{"id":2,"name":"PayPal"},"fl_invoicing_type":{"id":2,"name":"Gutschrift"},"bankdetails":"Test Bankverbindung","prices":[],"cat_prices":null,"sectors":[],"cat_tools":[]}'
        );
        
        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

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