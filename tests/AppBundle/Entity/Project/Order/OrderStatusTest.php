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

class OrderStatusTest extends TestCase
{

    public function testOrderStatus() {
        $order = new OrderStatus();

        $value = 'TEST_STATUS_VALUE';
        $order->setValue($value);
        $this->assertEquals($value, $order->getValue());

        $itemOrder = 1;
        $order->setItemOrder($itemOrder);
        $this->assertEquals($itemOrder, $order->getItemOrder());
    }
}