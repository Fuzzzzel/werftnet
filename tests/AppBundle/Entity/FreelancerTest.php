<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Common\Anrede;
use AppBundle\Entity\Common\CatTool;
use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\Sector;
use AppBundle\Entity\Common\YesNoInProgress;
use AppBundle\Entity\Freelancer\Freelancer;
use AppBundle\Entity\Freelancer\FreelancerAddress;
use AppBundle\Entity\Freelancer\FreelancerInvoicingType;
use AppBundle\Entity\Freelancer\FreelancerPaymentType;
use AppBundle\Entity\Freelancer\FreelancerPrice;
use AppBundle\Entity\Freelancer\FreelancerRating;
use AppBundle\Entity\Freelancer\FreelancerStatus;
use AppBundle\Entity\User\User;
use Tests\AppBundle\DefaultWebTestCase;

class FreelancerTest extends DefaultWebTestCase
{
    public function testContactProperties() {
        $freelancer = new Freelancer();
        
        $name1 = 'FreelancerTest-Name1';
        $freelancer->setName1($name1);
        $this->assertEquals($freelancer->getName1(), $name1);

        $name2 = 'FreelancerTest-Name2';
        $freelancer->setName2($name2);
        $this->assertEquals($freelancer->getName2(), $name2);

        $phone = 'FreelancerTest-Phone';
        $freelancer->setPhone($phone);
        $this->assertEquals($freelancer->getPhone(), $phone);

        $phone2 = 'FreelancerTest-Phone2';
        $freelancer->setPhone2($phone2);
        $this->assertEquals($freelancer->getPhone2(), $phone2);

        $email = 'FreelancerTest-Email';
        $freelancer->setEmail($email);
        $this->assertEquals($freelancer->getEmail(), $email);

        $email2 = 'FreelancerTest-Email2';
        $freelancer->setEmail2($email2);
        $this->assertEquals($freelancer->getEmail2(), $email2);

        $fax = 'FreelancerTest-Fax';
        $freelancer->setFax($fax);
        $this->assertEquals($freelancer->getFax(), $fax);

        $skype = 'FreelancerTest-Skype';
        $freelancer->setSkype($skype);
        $this->assertEquals($freelancer->getSkype(), $skype);

        $comment = 'FreelancerTest-Comment';
        $freelancer->setComment($comment);
        $this->assertEquals($freelancer->getComment(), $comment);

        $createdAt = new \DateTime();
        $freelancer->setCreatedAt($createdAt);
        $this->assertEquals($freelancer->getCreatedAt(), $createdAt);

        return $freelancer;
    }

    /**
     * @depends testContactProperties
     */
    public function testPersonProperties($freelancer) {
        $anrede = new Anrede();
        $freelancer->setAnrede($anrede);
        $this->assertEquals($freelancer->getAnrede(), $anrede);

        $dateOfBirth = new \DateTime();
        $freelancer->setDateOfBirth($dateOfBirth);
        $this->assertEquals($freelancer->getDateOfBirth(), $dateOfBirth);

        $correspondLanguage = new Language();
        $freelancer->setCorrespondLanguage($correspondLanguage);
        $this->assertEquals($freelancer->getCorrespondLanguage(), $correspondLanguage);

        return $freelancer;
    }

    /**
     * @depends testPersonProperties
     */
    public function testFreelancerProperties($freelancer) {
        $supplierNo = 'FreelancerTest-SupplierNo';
        $freelancer->setSupplierNo($supplierNo);
        $this->assertEquals($freelancer->getSupplierNo(), $supplierNo);

        $companyName = 'FreelancerTest-CompanyName';
        $freelancer->setCompanyName($companyName);
        $this->assertEquals($freelancer->getCompanyName(), $companyName);

        $address = new FreelancerAddress();
        $freelancer->setAddress($address);
        $this->assertEquals($freelancer->getAddress(), $address);
        $this->assertEquals($freelancer->getAddress()->getFreelancer(), $freelancer);

        $flStatus = new FreelancerStatus();
        $freelancer->setFlStatus($flStatus);
        $this->assertEquals($freelancer->getFlStatus(), $flStatus);

        $mothertounge = new Language();
        $freelancer->setMothertounge($mothertounge);
        $this->assertEquals($freelancer->getMothertounge(), $mothertounge);

        $mothertounge2 = new Language();
        $freelancer->setMothertounge2($mothertounge2);
        $this->assertEquals($freelancer->getMothertounge2(), $mothertounge2);

        $flRating = new FreelancerRating();
        $freelancer->setFlRating($flRating);
        $this->assertEquals($freelancer->getFlRating(), $flRating);

        $dsgvo = new YesNoInProgress();
        $freelancer->setDsgvo($dsgvo);
        $this->assertEquals($freelancer->getDsgvo(), $dsgvo);
        
        $nda = new YesNoInProgress();
        $freelancer->setNda($nda);
        $this->assertEquals($freelancer->getNda(), $nda);

        $sworn = true;
        $freelancer->setSworn($sworn);
        $this->assertEquals($freelancer->getSworn(), $sworn);

        $vatNo = 'FreelancerTest-VatNo';
        $freelancer->setVatNo($vatNo);
        $this->assertEquals($freelancer->getVatNo(), $vatNo);

        $vatPayer = true;
        $freelancer->setVatPayer($vatPayer);
        $this->assertEquals($freelancer->getVatPayer(), $vatPayer);

        $taxId = 'FreelancerTest-TaxId';
        $freelancer->setTaxId($taxId);
        $this->assertEquals($freelancer->getTaxId(), $taxId);

        $flPaymentType = new Anrede();
        $freelancer->setAnrede($flPaymentType);
        $this->assertEquals($freelancer->getAnrede(), $flPaymentType);

        $flInvoicingType = new FreelancerInvoicingType();
        $freelancer->setFlInvoicingType($flInvoicingType);
        $this->assertEquals($freelancer->getFlInvoicingType(), $flInvoicingType);

        $bankdetails = 'FreelancerTest-Bankdetails';
        $freelancer->setBankdetails($bankdetails);
        $this->assertEquals($freelancer->getBankdetails(), $bankdetails);

        $price = new FreelancerPrice();
        $freelancer->addPrice($price);
        $this->assertContains($price, $freelancer->getPrices());
        $freelancer->removePrice($price);
        $this->assertNotContains($price, $freelancer->getPrices());

        $catPrices = true;
        $freelancer->setCatPrices($catPrices);
        $this->assertEquals($freelancer->getCatPrices(), $catPrices);

        $sector = new Sector();
        $freelancer->addSector($sector);
        $this->assertContains($sector, $freelancer->getSectors());
        $freelancer->removeSector($sector);
        $this->assertNotContains($sector, $freelancer->getSectors());

        $catTool = new CatTool();
        $freelancer->addCatTool($catTool);
        $this->assertContains($catTool, $freelancer->getCatTools());
        $freelancer->removeCatTool($catTool);
        $this->assertNotContains($catTool, $freelancer->getCatTools());

        $flPaymentType = new FreelancerPaymentType();
        $freelancer->setFlPaymentType($flPaymentType);
        $this->assertEquals($flPaymentType, $freelancer->getFlPaymentType());

        $createdBy = new User();
        $freelancer->setCreatedBy($createdBy);
        $this->assertEquals($freelancer->getCreatedBy(), $createdBy);
    }
}