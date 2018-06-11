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
use AppBundle\Entity\Freelancer\Freelancer;
use AppBundle\Entity\Freelancer\FreelancerPrice;
use Tests\AppBundle\DefaultWebTestCase;

class FreelancerPriceTest extends DefaultWebTestCase
{
    public function testFreelancerPrice() {
        $freelancerPrice = new FreelancerPrice();
        
        $lngSource = new Language();
        $freelancerPrice->setLngSource($lngSource);
        $this->assertEquals($freelancerPrice->getLngSource(), $lngSource);

        $lngTarget = new Language();
        $freelancerPrice->setLngTarget($lngTarget);
        $this->assertEquals($freelancerPrice->getLngTarget(), $lngTarget);

        $minimumPrice = 20;
        $freelancerPrice->setMinimumPrice($minimumPrice);
        $this->assertEquals($freelancerPrice->getMinimumPrice(), $minimumPrice);

        $pricePerUnit = 0.09;
        $freelancerPrice->setPricePerUnit($pricePerUnit);
        $this->assertEquals($freelancerPrice->getPricePerUnit(), $pricePerUnit);

        $service = new Service();
        $freelancerPrice->setService($service);
        $this->assertEquals($freelancerPrice->getService(), $service);

        $priceUnit = new PriceUnit();
        $freelancerPrice->setPriceUnit($priceUnit);
        $this->assertEquals($freelancerPrice->getPriceUnit(), $priceUnit);

        $currency = new Currency();
        $freelancerPrice->setCurrency($currency);
        $this->assertEquals($freelancerPrice->getCurrency(), $currency);

        $freelancer = new Freelancer();
        $freelancerPrice->setFreelancer($freelancer);
        $this->assertEquals($freelancerPrice->getFreelancer(), $freelancer);
    }
}