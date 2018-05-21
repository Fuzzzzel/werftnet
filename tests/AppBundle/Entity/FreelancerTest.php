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
use AppBundle\Entity\Freelancer;
use AppBundle\Entity\User;
use Tests\AppBundle\DefaultWebTestCase;

class FreelancerTest extends DefaultWebTestCase
{
    private $freelancer = null;

    public function setUp() {
        $this->freelancer = new Freelancer();
    }

    public function testContactProperties() {
        $name1 = 'FreelancerTest-Name1';
        $this->freelancer->setName1($name1);
        $this->assertEquals($this->freelancer->getName1(), $name1);

        $name2 = 'FreelancerTest-Name2';
        $this->freelancer->setName2($name2);
        $this->assertEquals($this->freelancer->getName2(), $name2);

        $phone = 'FreelancerTest-Phone';
        $this->freelancer->setPhone($phone);
        $this->assertEquals($this->freelancer->getPhone(), $phone);

        $phone2 = 'FreelancerTest-Phone2';
        $this->freelancer->setPhone2($phone2);
        $this->assertEquals($this->freelancer->getPhone2(), $phone2);

        $email = 'FreelancerTest-Email';
        $this->freelancer->setEmail($email);
        $this->assertEquals($this->freelancer->getEmail(), $email);

        $email2 = 'FreelancerTest-Email2';
        $this->freelancer->setEmail2($email2);
        $this->assertEquals($this->freelancer->getEmail2(), $email2);

        $fax = 'FreelancerTest-Fax';
        $this->freelancer->setFax($fax);
        $this->assertEquals($this->freelancer->getFax(), $fax);

        $skype = 'FreelancerTest-Skype';
        $this->freelancer->setSkype($skype);
        $this->assertEquals($this->freelancer->getSkype(), $skype);

        $comment = 'FreelancerTest-Comment';
        $this->freelancer->setComment($comment);
        $this->assertEquals($this->freelancer->getComment(), $comment);

        $createdAt = new \DateTime();
        $this->freelancer->setCreatedAt($createdAt);
        $this->assertEquals($this->freelancer->getCreatedAt(), $createdAt);
    }
    
    public function testPersonProperties() {
        $anrede = new Anrede();
        $this->freelancer->setAnrede($anrede);
        $this->assertEquals($this->freelancer->getAnrede(), $anrede);

        $dateOfBirth = new \DateTime();
        $this->freelancer->setDateOfBirth($dateOfBirth);
        $this->assertEquals($this->freelancer->getDateOfBirth(), $dateOfBirth);

        $correspondLanguage = new Language();
        $this->freelancer->setCorrespondLanguage($correspondLanguage);
        $this->assertEquals($this->freelancer->getCorrespondLanguage(), $correspondLanguage);
    }
    
    public function testFreelancerProperties() {
        $supplierNo = 'FreelancerTest-SupplierNo';
        $this->freelancer->setSupplierNo($supplierNo);
        $this->assertEquals($this->freelancer->getSupplierNo(), $supplierNo);

        $companyName = 'FreelancerTest-CompanyName';
        $this->freelancer->setCompanyName($companyName);
        $this->assertEquals($this->freelancer->getCompanyName(), $companyName);

        $address = new Freelancer\FreelancerAddress();
        $this->freelancer->setAddress($address);
        $this->assertEquals($this->freelancer->getAddress(), $address);
        $this->assertEquals($this->freelancer->getAddress()->getFreelancer(), $this->freelancer);

        $flStatus = new Freelancer\FreelancerStatus();
        $this->freelancer->setFlStatus($flStatus);
        $this->assertEquals($this->freelancer->getFlStatus(), $flStatus);

        $mothertounge = new Language();
        $this->freelancer->setMothertounge($mothertounge);
        $this->assertEquals($this->freelancer->getMothertounge(), $mothertounge);

        $mothertounge2 = new Language();
        $this->freelancer->setMothertounge2($mothertounge2);
        $this->assertEquals($this->freelancer->getMothertounge2(), $mothertounge2);

        $flRating = new Freelancer\FreelancerRating();
        $this->freelancer->setFlRating($flRating);
        $this->assertEquals($this->freelancer->getFlRating(), $flRating);

        $nda = new YesNoInProgress();
        $this->freelancer->setNda($nda);
        $this->assertEquals($this->freelancer->getNda(), $nda);

        $sworn = true;
        $this->freelancer->setSworn($sworn);
        $this->assertEquals($this->freelancer->getSworn(), $sworn);

        $vatNo = 'FreelancerTest-VatNo';
        $this->freelancer->setVatNo($vatNo);
        $this->assertEquals($this->freelancer->getVatNo(), $vatNo);

        $vatPayer = true;
        $this->freelancer->setVatPayer($vatPayer);
        $this->assertEquals($this->freelancer->getVatPayer(), $vatPayer);

        $taxId = 'FreelancerTest-TaxId';
        $this->freelancer->setTaxId($taxId);
        $this->assertEquals($this->freelancer->getTaxId(), $taxId);

        $flPaymentType = new Anrede();
        $this->freelancer->setAnrede($flPaymentType);
        $this->assertEquals($this->freelancer->getAnrede(), $flPaymentType);

        $flInvoicingType = new Freelancer\FreelancerInvoicingType();
        $this->freelancer->setFlInvoicingType($flInvoicingType);
        $this->assertEquals($this->freelancer->getFlInvoicingType(), $flInvoicingType);

        $bankdetails = 'FreelancerTest-Bankdetails';
        $this->freelancer->setBankdetails($bankdetails);
        $this->assertEquals($this->freelancer->getBankdetails(), $bankdetails);

        $price = new Freelancer\FreelancerPrice();
        $this->freelancer->addPrice($price);
        $this->assertContains($price, $this->freelancer->getPrices());
        $this->freelancer->removePrice($price);
        $this->assertNotContains($price, $this->freelancer->getPrices());

        $catPrices = true;
        $this->freelancer->setCatPrices($catPrices);
        $this->assertEquals($this->freelancer->getCatPrices(), $catPrices);

        $sector = new Sector();
        $this->freelancer->addSector($sector);
        $this->assertContains($sector, $this->freelancer->getSectors());
        $this->freelancer->removeSector($sector);
        $this->assertNotContains($sector, $this->freelancer->getSectors());

        $catTool = new CatTool();
        $this->freelancer->addCatTool($catTool);
        $this->assertContains($catTool, $this->freelancer->getCatTools());
        $this->freelancer->removeCatTool($catTool);
        $this->assertNotContains($catTool, $this->freelancer->getCatTools());

        $createdBy = new User();
        $this->freelancer->setCreatedBy($createdBy);
        $this->assertEquals($this->freelancer->getCreatedBy(), $createdBy);
    }
}