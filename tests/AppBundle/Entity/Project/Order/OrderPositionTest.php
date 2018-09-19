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
use AppBundle\Entity\Project\Order\OrderTask;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class OrderPositionTest extends TestCase
{

    public function testOrderPositionProperties() {
        $orderPosition = new OrderPosition();
        $this->assertNull($orderPosition->getOrderId());

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
        $this->assertEquals('01', $orderPosString);

        $customerPrice = 100.15;
        $orderPosition->setCustomerPrice($customerPrice);
        $this->assertEquals($customerPrice, $orderPosition->getCustomerPrice());

        $title = 'Title of position';
        $orderPosition->setTitle($title);
        $this->assertEquals($title, $orderPosition->getTitle());

        $description = 'Description of position';
        $orderPosition->setDescription($description);
        $this->assertEquals($description, $orderPosition->getDescription());

        $internalNote = 'Internal note of';
        $orderPosition->setInternalNote($internalNote);
        $this->assertEquals($internalNote, $orderPosition->getInternalNote());

        $task = new OrderTask();
        $orderPosition->addTask($task);
        $this->assertContains($task, $orderPosition->getTasks());
        $this->assertEquals($orderPosition, $task->getPosition());
        $orderPosition->removeTask($task);
        $this->assertNotContains($task, $orderPosition->getTasks());
        $this->assertEquals(null, $task->getPosition());
    }
}