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

class CustomerContactTest extends DefaultWebTestCase
{
    private $contact = null;

    public function setUp() {
        $this->contact = new Customer\CustomerContact();
    }

    public function testCustomerContact() {
        $position = 'CustomerContactTest-Position';
        $this->contact->setPosition($position);
        $this->assertEquals($this->contact->getPosition(), $position);

        $customer = new Customer();
        $this->contact->setCustomer($customer);
        $this->assertEquals($this->contact->getCustomer(), $customer);
    }
}