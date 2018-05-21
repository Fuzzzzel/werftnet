<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\Common\Country;
use AppBundle\Entity\Freelancer;
use Tests\AppBundle\DefaultWebTestCase;

class FreelancerAddressTest extends DefaultWebTestCase
{
    private $address = null;

    public function setUp() {
        $this->address = new Freelancer\FreelancerAddress();
    }

    public function testFreelancerAddress() {
        $street = 'FreelancerAddressTest-Street';
        $this->address->setStreet($street);
        $this->assertEquals($this->address->getStreet(), $street);

        $street2 = 'FreelancerAddressTest-Street2';
        $this->address->setStreet2($street2);
        $this->assertEquals($this->address->getStreet2(), $street2);

        $zipcode = 'FreelancerAddressTest-Zipcode';
        $this->address->setZipcode($zipcode);
        $this->assertEquals($this->address->getZipcode(), $zipcode);

        $city = 'FreelancerAddressTest-City';
        $this->address->setCity($city);
        $this->assertEquals($this->address->getCity(), $city);

        $country = new Country();
        $this->address->setCountry($country);
        $this->assertEquals($this->address->getCountry(), $country);
        
        $freelancer = new Freelancer();
        $this->address->setFreelancer($freelancer);
        $this->assertEquals($this->address->getFreelancer(), $freelancer);
        
    }
}