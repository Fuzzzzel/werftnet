<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Common\Currency;
use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\PriceUnit;
use AppBundle\Entity\Common\Service;
use AppBundle\Entity\Freelancer;
use Tests\AppBundle\DefaultWebTestCase;

class FreelancerPriceTest extends DefaultWebTestCase
{
    private $freelancerPrice = null;

    public function setUp() {
        $this->freelancerPrice = new Freelancer\FreelancerPrice();
    }

    public function testFreelancerPrice() {
        $lngSource = new Language();
        $this->freelancerPrice->setLngSource($lngSource);
        $this->assertEquals($this->freelancerPrice->getLngSource(), $lngSource);

        $lngTarget = new Language();
        $this->freelancerPrice->setLngTarget($lngTarget);
        $this->assertEquals($this->freelancerPrice->getLngTarget(), $lngTarget);

        $minimumPrice = 20;
        $this->freelancerPrice->setMinimumPrice($minimumPrice);
        $this->assertEquals($this->freelancerPrice->getMinimumPrice(), $minimumPrice);

        $pricePerUnit = 0.09;
        $this->freelancerPrice->setPricePerUnit($pricePerUnit);
        $this->assertEquals($this->freelancerPrice->getPricePerUnit(), $pricePerUnit);

        $service = new Service();
        $this->freelancerPrice->setService($service);
        $this->assertEquals($this->freelancerPrice->getService(), $service);

        $priceUnit = new PriceUnit();
        $this->freelancerPrice->setPriceUnit($priceUnit);
        $this->assertEquals($this->freelancerPrice->getPriceUnit(), $priceUnit);

        $currency = new Currency();
        $this->freelancerPrice->setCurrency($currency);
        $this->assertEquals($this->freelancerPrice->getCurrency(), $currency);

        $freelancer = new Freelancer();
        $this->freelancerPrice->setFreelancer($freelancer);
        $this->assertEquals($this->freelancerPrice->getFreelancer(), $freelancer);
    }
}