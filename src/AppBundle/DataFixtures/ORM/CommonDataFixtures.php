<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Common\Anrede;
use AppBundle\Entity\Common\CatTool;
use AppBundle\Entity\Common\Country;
use AppBundle\Entity\Common\Currency;
use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\PriceUnit;
use AppBundle\Entity\Common\Sector;
use AppBundle\Entity\Common\Service;
use AppBundle\Entity\Common\YesNoInProgress;
use AppBundle\Entity\Project\Order\OrderStatus;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class CommonDataFixtures implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $anredeInDb = $manager->getRepository(OrderStatus::class)->findAll();
        if(count($anredeInDb) > 0) {
            return;
        }

        // -----------------------------------
        // COMMON
        // -----------------------------------

        // Anrede
        $anrede = array(
            "Herr",
            "Frau",
            "Firma",
        );

        for ($i = 1; $i <= count($anrede); $i++) {
            $element = new Anrede();
            $element->setName($anrede[$i - 1]);
            $manager->persist($element);
        }


        // CAT-Tool
        $cat = array(
            "Trados",
            "MemoQ",
            "Across",
            "WordFast",
        );

        for ($i = 1; $i <= count($cat); $i++) {
            $element = new CatTool();
            $element->setName($cat[$i - 1]);
            $manager->persist($element);
        }

        // Country

        $country = array(
            "Deutschland",
            "Österreich",
            "Schweiz"
        );

        for ($i = 1; $i <= count($country); $i++) {
            $element = new Country();
            $element->setName($country[$i - 1]);
            $manager->persist($element);
        }


        // Language1 + 2 Subsprachen

        $language = new Language();
        $language->setName("Englisch");

        $lang1 = new Language();
        $lang1->setName("UK");
        $lang1->setMainItem($language);

        $lang2 = new Language();
        $lang2->setName("US");
        $lang2->setMainItem($language);

        $lang3 = new Language();
        $lang3->setName("CA");
        $lang3->setMainItem($language);

        $manager->persist($language);
        $manager->persist($lang1);
        $manager->persist($lang2);
        $manager->persist($lang3);

        // Language2 + 2 Subsprachen

        $language = new Language();
        $language->setName("Deutsch");

        $lang1 = new Language();
        $lang1->setName("DE");
        $lang1->setMainItem($language);

        $lang2 = new Language();
        $lang2->setName("CH");
        $lang2->setMainItem($language);

        $lang3 = new Language();
        $lang3->setName("AT");
        $lang3->setMainItem($language);

        $manager->persist($language);
        $manager->persist($lang1);
        $manager->persist($lang2);
        $manager->persist($lang3);


        // Preiseinheiten
        $priceUnits = array(
            "Quellwort",
            "Zielwort",
            "NZ",
            "Stunde",
            "Minute",
            "Seite",
        );


        for ($i = 1; $i <= count($priceUnits); $i++) {
            $element = new PriceUnit();
            $element->setName($priceUnits[$i - 1]);
            $manager->persist($element);
        }

        // Sector/Fachgebiet

        // Sector 1

        $sector = new Sector();
        $sector->setName("Technik");

        $subSector1 = new Sector();
        $subSector1->setName("Maschinenbau");
        $subSector1->setMainItem($sector);

        $subSector2 = new Sector();
        $subSector2->setName("Elektortechnik");
        $subSector2->setMainItem($sector);

        $subSector3 = new Sector();
        $subSector3->setName("Werkstoffkunde");
        $subSector3->setMainItem($sector);

        $manager->persist($sector);
        $manager->persist($subSector1);
        $manager->persist($subSector2);
        $manager->persist($subSector3);


        // Sector 2

        $sector = new Sector();
        $sector->setName("Finanzen");

        $subSector1 = new Sector();
        $subSector1->setName("Bank");
        $subSector1->setMainItem($sector);

        $subSector2 = new Sector();
        $subSector2->setName("Börse");
        $subSector2->setMainItem($sector);

        $subSector3 = new Sector();
        $subSector3->setName("Buchhaltung");
        $subSector3->setMainItem($sector);

        $manager->persist($sector);
        $manager->persist($subSector1);
        $manager->persist($subSector2);
        $manager->persist($subSector3);


        // Service/Dienstleistungen
        $service = array(
            "Lektorat",
            "Korrektorat",
            "Übersetzung",
            "DTP",
            "Dolmetschen",
        );


        for ($i = 1; $i <= count($service); $i++) {
            $element = new Service();
            $element->setName($service[$i - 1]);
            $manager->persist($element);
        }


        // Währungen
        $currencies = array(
            "EUR",
            "USD",
        );


        for ($i = 1; $i <= count($currencies); $i++) {
            $element = new Currency();
            $element->setName($currencies[$i - 1]);
            $manager->persist($element);
        }

        // YesNoInProgress
        $yesNoInProgress = array(
            "Ja",
            "Nein",
            "In Bearbeitung",
        );

        for ($i = 1; $i <= count($yesNoInProgress); $i++) {
            $element = new YesNoInProgress();
            $element->setName($yesNoInProgress[$i - 1]);
            $manager->persist($element);
        }

        $manager->flush();
    }
}