<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 13:40
 */

namespace Tests\AppBundle\Entity\Project\Order;


use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\CustomerContact;
use AppBundle\Entity\Project\Order\Order;
use AppBundle\Entity\Project\Order\OrderPosition;
use AppBundle\Entity\Project\Order\OrderStatus;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class OrderPositionTest extends TestCase
{

    public function testOrderPositionPorperties() {
        $orderPosition = new OrderPosition();
        $order = new Order();
        $order->setNumberInYear(1);
        $order->setCreatedAt(new \DateTime('2018-01-01'));

        $orderPosition->setOrder($order);
        $this->assertEquals($order, $orderPosition->getOrder());

        $createdAt = new \DateTime();
        $orderPosition->setCreatedAt($createdAt);
        $this->assertEquals($createdAt, $orderPosition->getCreatedAt());

        $orderPosition->setPositionNumber(1);
        $this->assertEquals(1, $orderPosition->getPositionNumber());

        $orderPosString = $orderPosition->getPosNoString();
        $this->assertEquals('18-0001-01', $orderPosString);
    }
}