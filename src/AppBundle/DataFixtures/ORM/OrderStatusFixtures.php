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
        // Order Status
        $orderStatusList = array(
            ["CREATED", "Angelegt", 1],
            ["IN_PREPARATION", "In Vorbereitung", 2],
            ["IN_PROGRESS", "In Arbeit", 3],
            ["DELIVERED", "Geliefert", 4],
            ["CANCELLED", "Storniert", 99]
        );

        for ($i = 0; $i < count($orderStatusList); $i++) {

            $orderStatus = $manager->getRepository(OrderStatus::class)->findOneBy(
                array(
                    'value' => $orderStatusList[$i][0]
                )
            );

            if($orderStatus === null) {
                $orderStatus = new OrderStatus();
            }

            $orderStatus->setValue($orderStatusList[$i][0]);
            $orderStatus->setName($orderStatusList[$i][1]);
            $orderStatus->setItemOrder($orderStatusList[$i][2]);
            $manager->persist($orderStatus);
        }

        $manager->flush();
    }
}