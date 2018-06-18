<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Project\Order\OrderStatus;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class OrderStatusFixtures implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {

        $orderStatusInDb = $manager->getRepository(OrderStatus::class)->findAll();
        if(count($orderStatusInDb) > 0) {
            return;
        }

        // Order Status
        $orderStatusList = array(
            "Angelegt",
            "In Vorbereitung",
            "In Arbeit",
            "Geliefert",
            "Rechnung erstellt",
            "Rechnung bezahlt",
            "Storniert"
        );

        for ($i = 1; $i <= count($orderStatusList); $i++) {
            $orderStatus = new OrderStatus();
            $orderStatus->setName($orderStatusList[$i - 1]);
            $manager->persist($orderStatus);
        }

        $manager->flush();
    }
}