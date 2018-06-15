<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Common\Anrede;
use AppBundle\Entity\Common\CatTool;
use AppBundle\Entity\Common\Country;
use AppBundle\Entity\Common\Currency;
use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\PriceUnit;
use AppBundle\Entity\Common\Sector;
use AppBundle\Entity\Common\SectorSub;
use AppBundle\Entity\Common\Service;
use AppBundle\Entity\Common\YesNoInProgress;
use AppBundle\Entity\Customer\CustomerOrigin;
use AppBundle\Entity\Customer\CustomerPotential;
use AppBundle\Entity\Customer\CustomerStatus;
use AppBundle\Entity\Project\Order\OrderStatus;
use AppBundle\Entity\User\User;
use AppBundle\Entity\User\UserRole;
use AppBundle\Entity\Freelancer\FreelancerPaymentType;
use AppBundle\Entity\Freelancer\FreelancerInvoicingType;
use AppBundle\Entity\Freelancer\FreelancerRating;
use AppBundle\Entity\Freelancer\FreelancerStatus;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class LoadDefaultData implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {

        // USER
        // StandardRollen
        $roleUser = new UserRole();
        $roleUser->setName("ROLE_USER");
        $manager->persist($roleUser);

        $roleAdmin = new UserRole();
        $roleAdmin->setName("ROLE_ADMIN");
        $manager->persist($roleAdmin);

        $roleAccountManager = new UserRole();
        $roleAccountManager->setName("ROLE_ACCOUNT_MANAGER");
        $manager->persist($roleAccountManager);

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

        // Testuser für den anfänglichen Admin anlegen
        $user = new User();
        $user->setUsername('admin');
        $user->setEmail('admin@some.domain.com');

        $plainPassword = 'admin';
        $encoder = $this->container->get('security.password_encoder');
        $encoded = $encoder->encodePassword($user, $plainPassword);
        $user->setPassword($encoded);
        $user->addRole($roleAdmin);

        $manager->persist($user);
        $manager->flush();

        // Normalen Testuser (als Account Manager) anlegen
        $user = new User();
        $user->setUsername('user');
        $user->setEmail('user@some.domain.com');

        $plainPassword = 'user';
        $encoder = $this->container->get('security.password_encoder');
        $encoded = $encoder->encodePassword($user, $plainPassword);
        $user->setPassword($encoded);
        $user->addRole($roleUser);
        $user->addRole($roleAccountManager);

        $manager->persist($user);
        $manager->flush();
    }
}