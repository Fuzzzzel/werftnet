<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 10.09.2016
 * Time: 18:52
 */

namespace AppBundle\Entity\Customer;

use AppBundle\Entity\Common\Person;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Customer\CustomerContactRepository")
 * @ORM\Table(name="CustomerContact")
 */
class CustomerContact extends Person
{
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\Customer", inversedBy="contacts")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\Customer")
     */
    private $customer;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $position;

    /**
     * Set position
     *
     * @param string $position
     *
     * @return CustomerContact
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return string
     */
    public function getPosition()
    {
        return $this->position;
    }


    /**
     * Set customer
     *
     * @param \AppBundle\Entity\Customer\Customer $customer
     *
     * @return CustomerContact
     */
    public function setCustomer(\AppBundle\Entity\Customer\Customer $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return \AppBundle\Entity\Customer
     */
    public function getCustomer()
    {
        return $this->customer;
    }
}
