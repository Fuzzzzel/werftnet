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
use AppBundle\Entity\Project\Order\OrderTaskPrice;
use DoctrineExtensions\Query\Mysql\Date;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class OrderTaskPriceTest extends TestCase
{

    public function testOrderTaskPricePorperties() {
        $taskPrice = new OrderTaskPrice();

        $task = new OrderTask();
        $taskPrice->setTask($task);
        $this->assertEquals($task, $taskPrice->getTask());
    }
}