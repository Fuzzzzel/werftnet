<?php

namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\Customer\CustomerOrigin;
use AppBundle\Entity\Customer\CustomerPotential;
use AppBundle\Entity\Customer\CustomerStatus;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class CustomerDataFixtures implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        // ToDo: Refactor to test each property separately
        $customerOriginInDb = $manager->getRepository(CustomerOrigin::class)->findAll();
        if(count($customerOriginInDb) > 0) {
            return;
        }


        // KUNDEN

        // Customer Origin
        $customerOrigin = array(
            "Akquise",
            "Empfehlung",
            "Website",
            "Quahill"
        );

        for ($i = 1; $i <= count($customerOrigin); $i++) {
            $origin = new CustomerOrigin();
            $origin->setName($customerOrigin[$i - 1]);
            $manager->persist($origin);
        }


        // Customer Potential
        $customerPotential = array(
            "A (Betrag A)",
            "B (Betrag B)",
            "C (Betrag C)",
            "D (Betrag D)",
        );

        for ($i = 1; $i <= count($customerPotential); $i++) {
            $potential = new CustomerPotential();
            $potential->setName($customerPotential[$i - 1]);
            $manager->persist($potential);
        }


        // Customer Status
        $customerStatus = array(
            "Aktiver Kunde",
            "Möglicher Kunde",
            "Kein Interesse",
            "Verlorener Kunde",
        );

        for ($i = 1; $i <= count($customerStatus); $i++) {
            $status = new CustomerStatus();
            $status->setName($customerStatus[$i - 1]);
            $manager->persist($status);
        }

        $manager->flush();
    }
}