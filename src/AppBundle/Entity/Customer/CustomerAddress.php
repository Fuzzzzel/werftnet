<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 19:17
 */

namespace AppBundle\Entity\Customer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Common\Address;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Address
 * @package AppBundle\Entity\Customer
 *
 * @ORM\Entity
 * @ORM\Table(name="CustomerAddress")
 */
class CustomerAddress extends Address
{
    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Customer", mappedBy="address")
     * @JMS\Type("AppBundle\Entity\Customer")
     */
    private $customer;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->customer = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set street
     *
     * @param string $street
     *
     * @return CustomerAddress
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set street2
     *
     * @param string $street2
     *
     * @return CustomerAddress
     */
    public function setStreet2($street2)
    {
        $this->street2 = $street2;

        return $this;
    }

    /**
     * Get street2
     *
     * @return string
     */
    public function getStreet2()
    {
        return $this->street2;
    }

    /**
     * Set zipcode
     *
     * @param string $zipcode
     *
     * @return CustomerAddress
     */
    public function setZipcode($zipcode)
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    /**
     * Get zipcode
     *
     * @return string
     */
    public function getZipcode()
    {
        return $this->zipcode;
    }

    /**
     * Set city
     *
     * @param string $city
     *
     * @return CustomerAddress
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set customer
     *
     * @param \AppBundle\Entity\Customer $customer
     *
     * @return CustomerAddress
     */
    public function setCustomer(\AppBundle\Entity\Customer $customer)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set country
     *
     * @param \AppBundle\Entity\Common\Country $country
     *
     * @return CustomerAddress
     */
    public function setCountry(\AppBundle\Entity\Common\Country $country = null)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return \AppBundle\Entity\Common\Country
     */
    public function getCountry()
    {
        return $this->country;
    }
}
