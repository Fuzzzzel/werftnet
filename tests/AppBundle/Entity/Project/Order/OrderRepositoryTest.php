<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 08.06.2018
 * Time: 21:31
 */

use AppBundle\Entity\Project\Order\Order;

class OrderRepositoryTest extends \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase
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
        $orders = $this->em
            ->getRepository(Order::class)
            ->findAllBySearchParams(null, 5);

        $this->assertTrue(is_array($orders));
    }
}