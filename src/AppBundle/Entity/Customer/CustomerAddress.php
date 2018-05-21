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
}
