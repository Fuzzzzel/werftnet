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
    public function testCreateCustomer() {
        $client = $this->getAdminClient();
        $client->request(
            'POST',
            '/customers',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1":"Test-Firma1","name2":"Test-Firma2","phone":"Test-Phone","phone2":"Test-Mobile","email":"test@mail.com","email2":"test2@mail.com","fax":"Test-Fax","skype":"Test-Skype","comment":"Dat issen einfacher Kommentar","address":{"street":"Test-Straße","street2":"Test-Straße2","zipcode":"Test-Zip","city":"Test-City","country":{"id":1,"name":"Test-Country"}},"origin":{"id":1,"name":"Akquise"},"potential":{"id":1,"name":"A (Betrag A)"},"account_manager":null,"status":{"id":1,"name":"Aktiver Kunde"},"invoicing_details":"Test Rechnungsbedingungen","contacts":[]}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    public function testSearchCustomers() {

        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/customers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Get customer by id
        $customerList = json_decode($content, true);
        $customerId = $customerList['items'][0]['id'];

        $crawler = $client->request('GET', '/customers/'.$customerId);
        $this->assertJson($client->getResponse()->getContent());
    }

    /*
    public function testCreateCustomerContact() {
        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/customers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Delete customer by id
        $customerList = json_decode($content, true);
        $customerId = $customerList['items'][0]['id'];

        $crawler = $client->request(
            'DELETE',
            '/customers/' + $customerId + '/contacts',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1": "Test-Name", "name2":"Test-Name2"}'
        );
        $this->assertJson($client->getResponse()->getContent());
    }
    */

    public function testDeleteCustomer() {

        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/customers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Delete customer by id
        $customerList = json_decode($content, true);
        $customerId = $customerList['items'][0]['id'];

        $crawler = $client->request(
            'DELETE',
            '/customers/' . $customerId
        );
        $this->assertJson($client->getResponse()->getContent());
    }
}