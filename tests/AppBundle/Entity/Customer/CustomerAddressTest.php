<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Common\Country;
use AppBundle\Entity\Customer;
use Tests\AppBundle\DefaultWebTestCase;

class CustomerAddressTest extends DefaultWebTestCase
{
    private $address = null;

    public function setUp() {
        $this->address = new Customer\CustomerAddress();
    }

    public function testCustomerAddress() {
        $street = 'CustomerAddressTest-Street';
        $this->address->setStreet($street);
        $this->assertEquals($this->address->getStreet(), $street);

        $street2 = 'CustomerAddressTest-Street2';
        $this->address->setStreet2($street2);
        $this->assertEquals($this->address->getStreet2(), $street2);

        $zipcode = 'CustomerAddressTest-Zipcode';
        $this->address->setZipcode($zipcode);
        $this->assertEquals($this->address->getZipcode(), $zipcode);

        $city = 'CustomerAddressTest-City';
        $this->address->setCity($city);
        $this->assertEquals($this->address->getCity(), $city);

        $country = new Country();
        $this->address->setCountry($country);
        $this->assertEquals($this->address->getCountry(), $country);

        $customer = new Customer();
        $this->address->setCustomer($customer);
        $this->assertEquals($this->address->getCustomer(), $customer);

    }
}