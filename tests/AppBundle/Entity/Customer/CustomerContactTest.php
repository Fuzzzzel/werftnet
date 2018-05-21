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
    public function testCustomerContact() {
        $contact = new Customer\CustomerContact();
        
        $position = 'CustomerContactTest-Position';
        $contact->setPosition($position);
        $this->assertEquals($contact->getPosition(), $position);

        $customer = new Customer();
        $contact->setCustomer($customer);
        $this->assertEquals($contact->getCustomer(), $customer);
    }
}