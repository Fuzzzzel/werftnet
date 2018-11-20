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
use AppBundle\Entity\Freelancer\Freelancer;
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

        $description = 'Neue Positionsbeschreibung, kann viel Text sein ...';
        $task->setDescription($description);
        $this->assertEquals($description, $task->getDescription());

        $internalNote = 'Interne Notiz für den Projektmanager';
        $task->setInternalNote($internalNote);
        $this->assertEquals($internalNote, $task->getInternalNote());

        $deliveryDate = new \DateTime();
        $task->setDeliveryDate($deliveryDate);
        $this->assertEquals($deliveryDate, $task->getDeliveryDate());

        $taskPrice = 37.60;
        $task->setTaskPrice($taskPrice);
        $this->assertEquals($taskPrice, $task->getTaskPrice());

        $order = new Order();
        $order->setCreatedAt(new \DateTime('2018-01-01'));
        $order->setNumberInYear(1);

        $this->assertEquals(null, $task->getPositionId()); // without Position
        $orderPosition = new OrderPosition();
        $orderPosition->setPositionNumber(1);

        $lng = new Language();
        $orderPosition->setLngSource($lng);
        $orderPosition->setLngTarget($lng);
        $freelancer = new Freelancer();
        $task->setFreelancer($freelancer);
        $this->assertEquals($freelancer, $task->getFreelancer());
        $this->assertEquals($lng, $orderPosition->getLngSource());
        $this->assertEquals($lng, $orderPosition->getLngTarget());
        $task->setPosition($orderPosition);
        $this->assertEquals($orderPosition, $task->getPosition());
        $this->assertEquals(null, $task->getPositionId()); // with position

        $this->assertEquals(null, $task->getOrderId()); // without order
        $orderPosition->setOrder($order);
        $this->assertEquals(null, $task->getOrderId()); // with order
        $this->assertEquals('18-0001-01-001', $task->getTaskNoString());

        $task->resetTitleToPositionLangCombo();
        $this->assertEquals(' → ', $task->getTitle());
    }
}