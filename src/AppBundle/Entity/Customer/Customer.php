<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 10.09.2016
 * Time: 18:44
 */

namespace AppBundle\Entity\Customer;

use AppBundle\Entity\Common\Company;
use AppBundle\Entity\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Customer
 * @package AppBundle\Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Customer\CustomerRepository")
 * @ORM\Table(name="Customer")
 */
class Customer extends Company
{

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update", "dropdown"})
     */
    private $customerNo;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Customer\CustomerAddress", inversedBy="customer", cascade={"all"})
     * @ORM\JoinColumn(name="customeraddress_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\CustomerAddress")
     * @JMS\Groups({"display", "update"})
     */
    private $address;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\CustomerOrigin")
     * @ORM\JoinColumn(name="customer_origin_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\CustomerOrigin")
     * @JMS\Groups({"display", "update"})
     */
    private $origin;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\CustomerPotential")
     * @ORM\JoinColumn(name="customer_potential_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\CustomerPotential")
     * @JMS\Groups({"display", "update"})
     */
    private $potential;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User\User")
     * @ORM\JoinColumn(name="account_manager_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\User\User")
     * @JMS\Groups({"display", "update"})
     */
    private $accountManager;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\CustomerStatus")
     * @ORM\JoinColumn(name="customer_status_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\CustomerStatus")
     * @JMS\Groups({"display", "update"})
     */
    private $status;

    /**
     * Bedingungen zur Rechnungsstellung
     *
     * @ORM\Column(type="text", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $invoicingDetails;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Customer\CustomerContact", mappedBy="customer", cascade={"all"})
     * @ORM\OrderBy({"name2" = "ASC"})
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Customer\CustomerContact>")
     * @JMS\Groups({"display", "update"})
     */
    private $contacts;

    public function __construct() {
        $this->contacts = new ArrayCollection();
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
     * Set customerNo
     *
     * @param string $customerNo
     *
     * @return Customer
     */
    public function setCustomerNo($customerNo)
    {
        $this->customerNo = $customerNo;

        return $this;
    }

    /**
     * Get customerNo
     *
     * @return string
     */
    public function getCustomerNo()
    {
        return $this->customerNo;
    }
    

    /**
     * Set invoicingDetails
     *
     * @param string $invoicingDetails
     *
     * @return Customer
     */
    public function setInvoicingDetails($invoicingDetails)
    {
        $this->invoicingDetails = $invoicingDetails;

        return $this;
    }

    /**
     * Get invoicingDetails
     *
     * @return string
     */
    public function getInvoicingDetails()
    {
        return $this->invoicingDetails;
    }


    /**
     * Set address
     *
     * @param \AppBundle\Entity\Customer\CustomerAddress $address
     *
     * @return Customer
     */
    public function setAddress(CustomerAddress $address = null)
    {
        if ($address !== null) {
            $address->setCustomer($this);
        }
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return \AppBundle\Entity\Customer\CustomerAddress
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set origin
     *
     * @param \AppBundle\Entity\Customer\CustomerOrigin $origin
     *
     * @return Customer
     */
    public function setOrigin(CustomerOrigin $origin = null)
    {
        $this->origin = $origin;

        return $this;
    }

    /**
     * Get origin
     *
     * @return \AppBundle\Entity\Customer\CustomerOrigin
     */
    public function getOrigin()
    {
        return $this->origin;
    }

    /**
     * Set potential
     *
     * @param \AppBundle\Entity\Customer\CustomerPotential $potential
     *
     * @return Customer
     */
    public function setPotential(CustomerPotential $potential = null)
    {
        $this->potential = $potential;

        return $this;
    }

    /**
     * Get accountManager
     *
     * @return \AppBundle\Entity\User\User
     */
    public function getAccountManager()
    {
        return $this->accountManager;
    }

    /**
     * Set accountManager
     *
     * @param \AppBundle\Entity\User\User $accountManager
     *
     * @return Customer
     */
    public function setAccountManager(User $accountManager = null)
    {
        $this->accountManager = $accountManager;

        return $this;
    }

    /**
     * Get potential
     *
     * @return \AppBundle\Entity\Customer\CustomerPotential
     */
    public function getPotential()
    {
        return $this->potential;
    }

    /**
     * Set status
     *
     * @param \AppBundle\Entity\Customer\CustomerStatus $status
     *
     * @return Customer
     */
    public function setStatus(CustomerStatus $status = null)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return \AppBundle\Entity\Customer\CustomerStatus
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Add contact
     *
     * @param \AppBundle\Entity\Customer\CustomerContact $contact
     *
     * @return Customer
     */
    public function addContact(CustomerContact $contact)
    {
        $contact->setCustomer($this);
        $this->contacts[] = $contact;

        return $this;
    }

    /**
     * Remove contact
     *
     * @param \AppBundle\Entity\Customer\CustomerContact $contact
     */
    public function removeContact(CustomerContact $contact)
    {
        $contact->setCustomer(null);
        $this->contacts->removeElement($contact);
    }

    /**
     * Get contacts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getContacts()
    {
        return $this->contacts;
    }

}
