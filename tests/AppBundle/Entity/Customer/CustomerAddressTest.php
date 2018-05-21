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
    public function testCustomerAddress() {
        $address = new Customer\CustomerAddress();
        
        $street = 'CustomerAddressTest-Street';
        $address->setStreet($street);
        $this->assertEquals($address->getStreet(), $street);

        $street2 = 'CustomerAddressTest-Street2';
        $address->setStreet2($street2);
        $this->assertEquals($address->getStreet2(), $street2);

        $zipcode = 'CustomerAddressTest-Zipcode';
        $address->setZipcode($zipcode);
        $this->assertEquals($address->getZipcode(), $zipcode);

        $city = 'CustomerAddressTest-City';
        $address->setCity($city);
        $this->assertEquals($address->getCity(), $city);

        $country = new Country();
        $address->setCountry($country);
        $this->assertEquals($address->getCountry(), $country);

        $customer = new Customer();
        $address->setCustomer($customer);
        $this->assertEquals($address->getCustomer(), $customer);

    }
}