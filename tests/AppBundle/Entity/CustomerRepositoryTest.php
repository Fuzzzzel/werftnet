<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 08.06.2018
 * Time: 21:31
 */

use AppBundle\Entity\Customer\Customer;

class CustomerRepositoryTest extends \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase
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
    public function testFindAllCustomersUnpaginated()
    {
        $customers = $this->em
            ->getRepository(Customer::class)
            ->findAllBySearchParams(null, 5);

        $this->assertTrue(is_array($customers));
    }
}