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

        $status = new OrderStatus();
        $order->setStatus($status);
        $this->assertEquals($status, $order->getStatus());

        $orderPosition = new OrderPosition();
        $order->addPosition($orderPosition);
        $this->assertContains($orderPosition, $order->getPositions());
        $order->removePosition($orderPosition);
        $this->assertNotContains($orderPosition, $order->getPositions());
    }

}