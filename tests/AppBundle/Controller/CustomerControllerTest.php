<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace Tests\AppBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Tests\AppBundle\DefaultWebTestCase;

class CustomerControllerTest extends DefaultWebTestCase
{
    public function testGetCustomerWithoutId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/customers/xyz'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

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

    public function testFetchCustomerDropdownValues() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/customers/dropdownvalues"
        );

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($response->getContent());
        $contacts = json_decode($response->getContent());
        $this->assertTrue(is_array($contacts));
    }

    public function testSearchCustomers() {

        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/customers/search');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Get customer by id
        $customerList = json_decode($content);
        $customerId = $customerList->items[0]->id;

        $crawler = $client->request('GET', '/customers/'.$customerId);
        $this->assertJson($client->getResponse()->getContent());

        return $customerId;
    }

    public function testSearchCustomersBySearchParameters() {

        // Search customer
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/customers/search',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"origin": {"id": 1}, "potential": {"id": 1}, "account_manager": {"id": 1}, "status": {"id": 1}, "name": "Test Customer Name", "asp_name": "Test Asp Name"}'
            );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    /**
     * @depends testSearchCustomers
     */
    public function testCreateCustomerContact($customerId) {
       $client = $this->getAdminClient();
       $crawler = $client->request(
            'POST',
            '/customers/' . $customerId . '/contacts',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1": "Test-Name", "name2":"Test-Name2"}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        // Get customer by id
        $customerContact = json_decode($content);
        $this->assertGreaterThan(0,$customerContact->id);

        return array('contact' => $customerContact, 'customerId' => $customerId);
    }

    public function testGetCustomerContactWithoutCustomerId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/customers/xyz/contacts/abc'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testGetCustomerContactWithoutContactId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/customers/1/contacts/abc'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateCustomerContact
     */
    public function testGetCustomerContactWithWrongCustomerId($customerContactAndCustomerId) {
        $customerContact = $customerContactAndCustomerId['contact'];
        $wrongCustomerId = $customerContactAndCustomerId['customerId'] + 1;

        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/customers/{$wrongCustomerId}/contacts/{$customerContact->id}"
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateCustomerContact
     */
    public function testSearchCustomerContact($customerContactAndCustomerId) {
        $customerContact = $customerContactAndCustomerId['contact'];
        $customerId = $customerContactAndCustomerId['customerId'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'GET',
            '/customers/' . $customerId . '/contacts/' . $customerContact->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"name1": "Test-Name", "name2":"Test-Name2"}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    /**
     * @depends testSearchCustomers
     */
    public function testGetCustomerContacts($customerId) {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/customers/{$customerId}/contacts"
        );

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($response->getContent());
        $contacts = json_decode($response->getContent());
        $this->assertTrue(is_array($contacts));
    }

    public function testGetCustomerContactsWithoutCustomerId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/customers/xyz/contacts"
        );

        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    /**
     * @depends testCreateCustomerContact
     */
    public function testDeleteCustomerContactWithWrongCustomerId($customerContactAndCustomerId) {
        $customerContact = $customerContactAndCustomerId['contact'];
        $wrongCustomerId = $customerContactAndCustomerId['customerId'] + 1;

        $client = $this->getAdminClient();
        $client->request(
            'DELETE',
            "/customers/{$wrongCustomerId}/contacts/{$customerContact->id}"
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testDeleteNonExistentCustomerContact() {
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/customers/1/contacts/99999'
        );
        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateCustomerContact
     */
    public function testDeleteCustomerContact($customerContactAndCustomerId) {
        $customerContact = $customerContactAndCustomerId['contact'];
        $customerId = $customerContactAndCustomerId['customerId'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/customers/' . $customerId . '/contacts/' . $customerContact->id
        );
        $this->assertJson($client->getResponse()->getContent());
    }


    /**
     * @depends testSearchCustomers
     */
    public function testDeleteCustomer($customerId) {

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/customers/' . $customerId
        );
        $this->assertJson($client->getResponse()->getContent());
    }

}