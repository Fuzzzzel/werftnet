<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 19:17
 */

namespace AppBundle\Entity\Freelancer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Common\Address;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Address
 * @package AppBundle\Entity\Freelancer
 *
 * @ORM\Entity
 * @ORM\Table(name="FreelancerAddress")
 */
class FreelancerAddress extends Address
{
    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Freelancer", mappedBy="address")
     * @ORM\JoinColumn(name="freelancer_id", referencedColumnName="id", onDelete="SET NULL")
     * @JMS\Type("AppBundle\Entity\Freelancer")
     */
    private $freelancer;

    /**
     * Constructor
     */
    public function __construct()
    {

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
     * @return FreelancerAddress
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
     * @return FreelancerAddress
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
     * @return FreelancerAddress
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
     * @return FreelancerAddress
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
     * Set freelancer
     *
     * @param \AppBundle\Entity\Freelancer $freelancer
     *
     * @return FreelancerAddress
     */
    public function setFreelancer(\AppBundle\Entity\Freelancer $freelancer)
    {
        $this->freelancer = $freelancer;

        return $this;
    }

    /**
     * Get freelancer
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFreelancer()
    {
        return $this->freelancer;
    }

    /**
     * Set country
     *
     * @param \AppBundle\Entity\Common\Country $country
     *
     * @return FreelancerAddress
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
