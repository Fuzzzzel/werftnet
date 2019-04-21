<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Common\Anrede;
use AppBundle\Entity\Common\CatTool;
use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\Sector;
use AppBundle\Entity\Common\YesNoInProgress;
use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\CustomerAddress;
use AppBundle\Entity\Customer\CustomerContact;
use AppBundle\Entity\Customer\CustomerOrigin;
use AppBundle\Entity\Customer\CustomerPotential;
use AppBundle\Entity\Customer\CustomerStatus;
use AppBundle\Entity\User\User;
use Tests\AppBundle\DefaultWebTestCase;

class CustomerTest extends DefaultWebTestCase
{
    public function testContactProperties() {
        $customer = new Customer();
        
        $name1 = 'CustomerTest-Name1';
        $customer->setName1($name1);
        $this->assertEquals($customer->getName1(), $name1);

        $name2 = 'CustomerTest-Name2';
        $customer->setName2($name2);
        $this->assertEquals($customer->getName2(), $name2);

        $phone = 'CustomerTest-Phone';
        $customer->setPhone($phone);
        $this->assertEquals($customer->getPhone(), $phone);

        $phone2 = 'CustomerTest-Phone2';
        $customer->setPhone2($phone2);
        $this->assertEquals($customer->getPhone2(), $phone2);

        $email = 'CustomerTest-Email';
        $customer->setEmail($email);
        $this->assertEquals($customer->getEmail(), $email);

        $email2 = 'CustomerTest-Email2';
        $customer->setEmail2($email2);
        $this->assertEquals($customer->getEmail2(), $email2);

        $fax = 'CustomerTest-Fax';
        $customer->setFax($fax);
        $this->assertEquals($customer->getFax(), $fax);

        $skype = 'CustomerTest-Skype';
        $customer->setSkype($skype);
        $this->assertEquals($customer->getSkype(), $skype);

        $comment = 'CustomerTest-Comment';
        $customer->setComment($comment);
        $this->assertEquals($customer->getComment(), $comment);

        $createdAt = new \DateTime();
        $customer->setCreatedAt($createdAt);
        $this->assertEquals($customer->getCreatedAt(), $createdAt);

        return $customer;
    }

    /**
     * @depends testContactProperties
     */
    public function testCustomerProperties($customer) {
        $customerNo = 'CustomerTest-CustomerNo';
        $customer->setCustomerNo($customerNo);
        $this->assertEquals($customer->getCustomerNo(), $customerNo);

        $address = new CustomerAddress();
        $customer->setAddress($address);
        $this->assertEquals($customer->getAddress(), $address);
        $this->assertEquals($customer->getAddress()->getCustomer(), $customer);

        $origin = new CustomerOrigin();
        $customer->setOrigin($origin);
        $this->assertEquals($customer->getOrigin(), $origin);

        $potential = new CustomerPotential();
        $customer->setPotential($potential);
        $this->assertEquals($customer->getPotential(), $potential);

        $accountManager = new User();
        $customer->setAccountManager($accountManager);
        $this->assertEquals($customer->getAccountManager(), $accountManager);

        $status = new CustomerStatus();
        $customer->setStatus($status);
        $this->assertEquals($customer->getStatus(), $status);

        $lastContactDate = new \DateTime();
        $customer->setLastContactDate($lastContactDate);
        $this->assertEquals($customer->getLastContactDate(), $lastContactDate);

        $invoicingDetails = 'CustomerTest-InvoicingDetails';
        $customer->setInvoicingDetails($invoicingDetails);
        $this->assertEquals($customer->getInvoicingDetails(), $invoicingDetails);

        $customerContact = new CustomerContact();
        $customer->addContact($customerContact);
        $this->assertContains($customerContact, $customer->getContacts());
        $customer->removeContact($customerContact);
        $this->assertNotContains($customerContact, $customer->getContacts());
    }
}