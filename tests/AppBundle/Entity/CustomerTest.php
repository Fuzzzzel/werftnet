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
use AppBundle\Entity\Customer;
use AppBundle\Entity\User;
use Tests\AppBundle\DefaultWebTestCase;

class CustomerTest extends DefaultWebTestCase
{
    private $customer = null;

    public function setUp() {
        $this->customer = new Customer();
    }

    public function testContactProperties() {
        $name1 = 'CustomerTest-Name1';
        $this->customer->setName1($name1);
        $this->assertEquals($this->customer->getName1(), $name1);

        $name2 = 'CustomerTest-Name2';
        $this->customer->setName2($name2);
        $this->assertEquals($this->customer->getName2(), $name2);

        $phone = 'CustomerTest-Phone';
        $this->customer->setPhone($phone);
        $this->assertEquals($this->customer->getPhone(), $phone);

        $phone2 = 'CustomerTest-Phone2';
        $this->customer->setPhone2($phone2);
        $this->assertEquals($this->customer->getPhone2(), $phone2);

        $email = 'CustomerTest-Email';
        $this->customer->setEmail($email);
        $this->assertEquals($this->customer->getEmail(), $email);

        $email2 = 'CustomerTest-Email2';
        $this->customer->setEmail2($email2);
        $this->assertEquals($this->customer->getEmail2(), $email2);

        $fax = 'CustomerTest-Fax';
        $this->customer->setFax($fax);
        $this->assertEquals($this->customer->getFax(), $fax);

        $skype = 'CustomerTest-Skype';
        $this->customer->setSkype($skype);
        $this->assertEquals($this->customer->getSkype(), $skype);

        $comment = 'CustomerTest-Comment';
        $this->customer->setComment($comment);
        $this->assertEquals($this->customer->getComment(), $comment);

        $createdAt = new \DateTime();
        $this->customer->setCreatedAt($createdAt);
        $this->assertEquals($this->customer->getCreatedAt(), $createdAt);
    }

    public function testCustomerProperties() {
        $customerNo = 'CustomerTest-CustomerNo';
        $this->customer->setCustomerNo($customerNo);
        $this->assertEquals($this->customer->getCustomerNo(), $customerNo);

        $address = new Customer\CustomerAddress();
        $this->customer->setAddress($address);
        $this->assertEquals($this->customer->getAddress(), $address);
        $this->assertEquals($this->customer->getAddress()->getCustomer(), $this->customer);

        $origin = new Customer\CustomerOrigin();
        $this->customer->setOrigin($origin);
        $this->assertEquals($this->customer->getOrigin(), $origin);

        $potential = new Customer\CustomerPotential();
        $this->customer->setPotential($potential);
        $this->assertEquals($this->customer->getPotential(), $potential);

        $accountManager = new User();
        $this->customer->setAccountManager($accountManager);
        $this->assertEquals($this->customer->getAccountManager(), $accountManager);

        $status = new Customer\CustomerStatus();
        $this->customer->setStatus($status);
        $this->assertEquals($this->customer->getStatus(), $status);

        $invoicingDetails = 'CustomerTest-InvoicingDetails';
        $this->customer->setInvoicingDetails($invoicingDetails);
        $this->assertEquals($this->customer->getInvoicingDetails(), $invoicingDetails);

        $customerContact = new Customer\CustomerContact();
        $this->customer->addContact($customerContact);
        $this->assertContains($customerContact, $this->customer->getContacts());
        $this->customer->removeContact($customerContact);
        $this->assertNotContains($customerContact, $this->customer->getContacts());
    }
}