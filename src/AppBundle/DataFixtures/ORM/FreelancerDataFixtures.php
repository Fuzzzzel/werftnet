<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Freelancer\FreelancerPaymentType;
use AppBundle\Entity\Freelancer\FreelancerInvoicingType;
use AppBundle\Entity\Freelancer\FreelancerRating;
use AppBundle\Entity\Freelancer\FreelancerStatus;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class FreelancerDataFixtures implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        // ToDo: Refactor to test each property separately
        $paymentTypeInDb = $manager->getRepository(FreelancerPaymentType::class)->findAll();
        if(count($paymentTypeInDb) > 0) {
            return;
        }

        // FREELANCER
        // Freelancer Bezahlart
        $paymentType = array(
            "Überweisung",
            "PayPal"
        );

        for ($i = 1; $i <= count($paymentType); $i++) {
            $element = new FreelancerPaymentType();
            $element->setName($paymentType[$i - 1]);
            $manager->persist($element);
        }

        // Freelancer Rechnungsart
        $invoicingType = array(
            "Rechnung",
            "Gutschrift"
        );

        for ($i = 1; $i <= count($invoicingType); $i++) {
            $element = new FreelancerInvoicingType();
            $element->setName($invoicingType[$i - 1]);
            $manager->persist($element);
        }


        // Rating Freelancer
        $freelancerRating = array(
            "A (sehr gut)",
            "B (in Ordnung)",
            "C (nur als Ausnahme)",
        );

        for ($i = 1; $i <= count($freelancerRating); $i++) {
            $element = new FreelancerRating();
            $element->setName($freelancerRating[$i - 1]);
            $manager->persist($element);
        }


        // Freelancer Status
        $freelancerStatus = array(
            "Lieferant",
            "Kandidat",
            "Bewerber",
            "Kein Interesse",
        );

        for ($i = 1; $i <= count($freelancerStatus); $i++) {
            $status = new FreelancerStatus();
            $status->setName($freelancerStatus[$i - 1]);
            $manager->persist($status);
        }

        $manager->flush();
    }
}