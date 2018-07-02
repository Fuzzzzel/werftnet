<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 13:40
 */

namespace Tests\AppBundle\Entity\Project\Order;


use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\CustomerContact;
use AppBundle\Entity\Project\Order\Order;
use AppBundle\Entity\Project\Order\OrderPosition;
use AppBundle\Entity\Project\Order\OrderStatus;
use AppBundle\Entity\Project\Order\OrderTask;
use AppBundle\Entity\Project\Order\OrderTaskPrice;
use DoctrineExtensions\Query\Mysql\Date;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class OrderTaskTest extends TestCase
{

    public function testOrderTaskProperties() {
        $task = new OrderTask();
        $this->assertEquals(null, $task->getId());

        $taskNumber = 1;
        $task->setTaskNumber($taskNumber);
        $this->assertEquals($taskNumber, $task->getTaskNumber());

        $createdAt = new \DateTime();
        $task->setCreatedAt($createdAt);
        $this->assertEquals($createdAt, $task->getCreatedAt());

        $title = 'Neuer Positionstitel';
        $task->setTitle($title);
        $this->assertEquals($title, $task->getTitle());

        $price = new OrderTaskPrice();
        $task->addPrice($price);
        $this->assertContains($price, $task->getPrices());
        $this->assertEquals($task, $price->getTask());
        $task->removePrice($price);
        $this->assertNotContains($price, $task->getPrices());
        $this->assertEquals(null, $price->getTask());

        $order = new Order();
        $order->setCreatedAt(new \DateTime('2018-01-01'));
        $order->setNumberInYear(1);
        $orderPosition = new OrderPosition();
        $orderPosition->setOrder($order);
        $orderPosition->setPositionNumber(1);

        $lng = new Language();
        $orderPosition->setLngSource($lng);
        $orderPosition->setLngTarget($lng);
        $this->assertEquals($lng, $orderPosition->getLngSource());
        $this->assertEquals($lng, $orderPosition->getLngTarget());

        $task->setPosition($orderPosition);
        $this->assertEquals($orderPosition, $task->getPosition());
        $this->assertEquals('18-0001-001', $task->getTaskNoString());

        $task->resetTitleToPositionLangCombo();
        $this->assertEquals(' → ', $task->getTitle());
    }
}