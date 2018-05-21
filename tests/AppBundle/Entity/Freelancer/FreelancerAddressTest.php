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
    public function testFreelancerAddress()
    {
        $address = new Freelancer\FreelancerAddress();

        $street = 'FreelancerAddressTest-Street';
        $address->setStreet($street);
        $this->assertEquals($address->getStreet(), $street);

        $street2 = 'FreelancerAddressTest-Street2';
        $address->setStreet2($street2);
        $this->assertEquals($address->getStreet2(), $street2);

        $zipcode = 'FreelancerAddressTest-Zipcode';
        $address->setZipcode($zipcode);
        $this->assertEquals($address->getZipcode(), $zipcode);

        $city = 'FreelancerAddressTest-City';
        $address->setCity($city);
        $this->assertEquals($address->getCity(), $city);

        $country = new Country();
        $address->setCountry($country);
        $this->assertEquals($address->getCountry(), $country);

        $freelancer = new Freelancer();
        $address->setFreelancer($freelancer);
        $this->assertEquals($address->getFreelancer(), $freelancer);

    }
}