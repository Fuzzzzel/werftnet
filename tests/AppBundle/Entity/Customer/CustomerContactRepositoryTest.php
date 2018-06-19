<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 08.06.2018
 * Time: 21:31
 */

use AppBundle\Entity\Customer\CustomerContact;

class CustomerContactRepositoryTest extends \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase
{
    private $em;

    protected function setUp()
    {
        $kernel = self::bootKernel();

        $this->em = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    /**
     * Should fail if no id passed
     */
    public function testFindAllCustomerContacts()
    {
        $customerContacts = $this->em
            ->getRepository(CustomerContact::class)
            ->findAllByCustomerId(1);

        $this->assertTrue(is_array($customerContacts));
    }
}