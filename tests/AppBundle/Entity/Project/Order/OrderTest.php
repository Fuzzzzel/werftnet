<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 13:40
 */

namespace Tests\AppBundle\Entity\Project\Order;


use AppBundle\Entity\Common\Sector;
use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\CustomerContact;
use AppBundle\Entity\Project\Order\Order;
use AppBundle\Entity\Project\Order\OrderPosition;
use AppBundle\Entity\Project\Order\OrderStatus;
use AppBundle\Entity\User\User;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class OrderTest extends TestCase
{

    public function testProjectPorperties() {
        $order = new Order();

        $customer = new Customer();
        $order->setCustomer($customer);
        $this->assertEquals($customer, $order->getCustomer());

        $customerContact = new CustomerContact();
        $order->setCustomerContact($customerContact);
        $this->assertEquals($customerContact, $order->getCustomerContact());

        $createdAt = new \DateTime();
        $order->setCreatedAt($createdAt);
        $this->assertEquals($createdAt, $order->getCreatedAt());

        $title = 'TestOrder-Title';
        $order->setTitle($title);
        $this->assertEquals($title, $order->getTitle());

        $description = 'TestOrder-Description';
        $order->setDescription($description);
        $this->assertEquals($description, $order->getDescription());

        $numberOfFiles = 3;
        $order->setNumberOfFiles($numberOfFiles);
        $this->assertEquals($numberOfFiles, $order->getNumberOfFiles());

        $sourceFormat = 'TestOrder-SourceFormat';
        $order->setSourceFormat($sourceFormat);
        $this->assertEquals($sourceFormat, $order->getSourceFormat());

        $targetFormat = 'TestOrder-Description';
        $order->setTargetFormat($targetFormat);
        $this->assertEquals($targetFormat, $order->getTargetFormat());

        $comment = 'TestOrder-Comment';
        $order->setComment($comment);
        $this->assertEquals($comment, $order->getComment());

        $projectManager = new User();
        $order->setProjectManager($projectManager);
        $this->assertEquals($projectManager, $order->getProjectManager());

        return $order;
    }

    /**
     * @depends testProjectPorperties
     */
    public function testOrderProperties(Order $order) {
        $deliveryDateDesired = new \DateTime();
        $order->setDeliveryDateDesired($deliveryDateDesired);
        $this->assertEquals($deliveryDateDesired, $order->getDeliveryDateDesired());

        $deliveryDate = new \DateTime();
        $order->setDeliveryDate($deliveryDate);
        $this->assertEquals($deliveryDate, $order->getDeliveryDate());

        $sector = new Sector();
        $order->setSector($sector);
        $this->assertEquals($sector, $order->getSector());

        $status = new OrderStatus();
        $order->setStatus($status);
        $this->assertEquals($status, $order->getStatus());

        $orderPosition = new OrderPosition();
        $order->addPosition($orderPosition);
        $this->assertContains($orderPosition, $order->getPositions());
        $this->assertEquals($order, $orderPosition->getOrder());
        $order->removePosition($orderPosition);
        $this->assertNotContains($orderPosition, $order->getPositions());
        $this->assertEquals(null, $orderPosition->getOrder());
    }

    public function testGetOrderNo() {
        $order = new Order();
        $order->setCreatedAt(new \DateTime());
        $order->setNumberInYear(1);
        $date = new \DateTime();
        $this->assertEquals($date->format('y'.'-'.'0001'), $order->getOrderNo());
    }

}