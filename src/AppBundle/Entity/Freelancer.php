<?php
/**
 * Klasse beschreibt ein Freelancer-Objekt
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\Common\Person;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Freelancer
 * @package AppBundle\Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\FreelancerRepository")
 * @ORM\Table(name="Freelancer")
 */
class Freelancer extends Person
{
    /**
     * @ORM\Column(type="integer", unique=true, nullable=true)
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    private $supplierNo;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $companyName;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Freelancer\FreelancerAddress", inversedBy="freelancer")
     * @ORM\JoinColumn(name="freelanceraddress_id", referencedColumnName="id", onDelete="CASCADE")
     * @JMS\Type("AppBundle\Entity\Freelancer\FreelancerAddress")
     * @JMS\Groups({"display", "update"})
     * @JMS\AccessType("public_method")
     */
    private $address;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\FreelancerStatus")
     * @ORM\JoinColumn(name="status_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Freelancer\FreelancerStatus")
     * @JMS\Groups({"display", "update"})
     */
    private $flStatus; // Entity

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="mothertounge_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    private $mothertounge;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="mothertounge2_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    private $mothertounge2;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\FreelancerRating")
     * @ORM\JoinColumn(name="fl_rating_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Freelancer\FreelancerRating")
     * @JMS\Groups({"display", "update"})
     */
    private $flRating; // Entity

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\YesNoInProgress")
     * @ORM\JoinColumn(name="nda_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\YesNoInProgress")
     * @JMS\Groups({"display", "update"})
     */
    private $nda;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @JMS\Type("boolean")
     * @JMS\Groups({"display", "update"})
     */
    private $sworn;

    // Dateien?

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $vatNo;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @JMS\Type("boolean")
     * @JMS\Groups({"display", "update"})
     */
    private $vatPayer;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $taxId;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\FreelancerPaymentType")
     * @ORM\JoinColumn(name="fl_payment_type_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Freelancer\FreelancerPaymentType")
     * @JMS\Groups({"display", "update"})
     */
    private $flPaymentType;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\FreelancerInvoicingType")
     * @ORM\JoinColumn(name="fl_invoicing_type_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Freelancer\FreelancerInvoicingType")
     * @JMS\Groups({"display", "update"})
     */
    private $flInvoicingType;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $bankdetails;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Freelancer\FreelancerPrice", mappedBy="freelancer")
     * @ORM\JoinColumn(name="price_id", referencedColumnName="id")
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Freelancer\FreelancerPrice>")
     * @JMS\Groups({"display", "update"})
     */
    private $prices;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @JMS\Type("boolean")
     * @JMS\Groups({"display", "update"})
     */
    private $catPrices;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Common\Sector")
     * @ORM\JoinTable(name="freelancers_sectors",
     *     joinColumns={@ORM\JoinColumn(name="freelancer_id", referencedColumnName="id", onDelete="CASCADE")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="sector_id", referencedColumnName="id")}
     *     )
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Common\Sector>")
     * @JMS\Groups({"display", "update"})
     */
    private $sectors; // Entity Collection

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Common\CatTool")
     * @ORM\JoinTable(name="freelancers_cattools",
     *     joinColumns={@ORM\JoinColumn(name="freelancer_id", referencedColumnName="id", onDelete="CASCADE")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="cattool_id", referencedColumnName="id")}
     *     )
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Common\CatTool>")
     * @JMS\Groups({"display", "update"})
     */
    private $catTools; // Entity Collection

    // Abwesenheiten --> Genauer eruieren, was gewünscht ist

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @JMS\Type("AppBundle\Entity\User")
     * @JMS\Groups({"display"})
     */
    protected $createdBy; // User

    public function __construct()
    {
        $this->prices = new ArrayCollection();
        $this->sectors = new ArrayCollection();
        $this->catTools = new ArrayCollection();
    }

    /**
     * Set supplierNo
     *
     * @param string $supplierNo
     *
     * @return mixed
     */
    public function setSupplierNo($supplierNo)
    {
        $this->supplierNo = $supplierNo;

        return $this;
    }

    /**
     * Get supplierNo
     *
     * @return string
     */
    public function getSupplierNo()
    {
        return $this->supplierNo;
    }


    /**
     * Set companyName
     *
     * @param string $companyName
     *
     * @return mixed
     */
    public function setCompanyName($companyName)
    {
        $this->companyName = $companyName;

        return $this;
    }

    /**
     * Get companyName
     *
     * @return string
     */
    public function getCompanyName()
    {
        return $this->companyName;
    }

    /**
     * Set vatNo
     *
     * @param string $vatNo
     *
     * @return Freelancer
     */
    public function setVatNo($vatNo)
    {
        $this->vatNo = $vatNo;

        return $this;
    }

    /**
     * Get vatNo
     *
     * @return string
     */
    public function getVatNo()
    {
        return $this->vatNo;
    }

    /**
     * Set vatPayer
     *
     * @param boolean $vatPayer
     *
     * @return Freelancer
     */
    public function setVatPayer($vatPayer)
    {
        $this->vatPayer = $vatPayer;

        return $this;
    }

    /**
     * Get vatPayer
     *
     * @return boolean
     */
    public function getVatPayer()
    {
        return $this->vatPayer;
    }
    
    /**
     * Set taxId
     *
     * @param string $taxId
     *
     * @return Freelancer
     */
    public function setTaxId($taxId)
    {
        $this->taxId = $taxId;

        return $this;
    }

    /**
     * Get taxId
     *
     * @return string
     */
    public function getTaxId()
    {
        return $this->taxId;
    }
    
    
    /**
     * Set bankdetails
     *
     * @param string $bankdetails
     *
     * @return Freelancer
     */
    public function setBankdetails($bankdetails)
    {
        $this->bankdetails = $bankdetails;

        return $this;
    }

    /**
     * Get bankdetails
     *
     * @return string
     */
    public function getBankdetails()
    {
        return $this->bankdetails;
    }

    /**
     * Set sworn
     *
     * @param boolean $sworn
     *
     * @return Freelancer
     */
    public function setSworn($sworn)
    {
        $this->sworn = $sworn;

        return $this;
    }

    /**
     * Get sworn
     *
     * @return boolean
     */
    public function getSworn()
    {
        return $this->sworn;
    }

    /**
     * Set address
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerAddress $address
     *
     * @return Freelancer
     */
    public function setAddress(\AppBundle\Entity\Freelancer\FreelancerAddress $address = null)
    {
        if ($address !== null) {
            $address->setFreelancer($this);
        }
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return \AppBundle\Entity\Freelancer\FreelancerAddress
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set status
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerStatus $flStatus
     *
     * @return Freelancer
     */
    public function setFlStatus(\AppBundle\Entity\Freelancer\FreelancerStatus $flStatus = null)
    {
        $this->flStatus = $flStatus;

        return $this;
    }

    /**
     * Get status
     *
     * @return \AppBundle\Entity\Freelancer\FreelancerStatus
     */
    public function getFlStatus()
    {
        return $this->flStatus;
    }

    /**
     * Set rating
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerRating $flRating
     *
     * @return Freelancer
     */
    public function setFlRating(\AppBundle\Entity\Freelancer\FreelancerRating $flRating = null)
    {
        $this->flRating = $flRating;

        return $this;
    }

    /**
     * Get rating
     *
     * @return \AppBundle\Entity\Freelancer\FreelancerRating
     */
    public function getFlRating()
    {
        return $this->flRating;
    }

    
    /**
     * Set mothertounge
     *
     * @param \AppBundle\Entity\Common\Language $mothertounge
     *
     * @return Freelancer
     */
    public function setMothertounge(\AppBundle\Entity\Common\Language $mothertounge = null)
    {
        $this->mothertounge = $mothertounge;

        return $this;
    }

    /**
     * Get mothertounge
     *
     * @return \AppBundle\Entity\Common\Language
     */
    public function getMothertounge()
    {
        return $this->mothertounge;
    }

    /**
     * Set mothertounge2
     *
     * @param \AppBundle\Entity\Common\Language $mothertounge2
     *
     * @return Freelancer
     */
    public function setMothertounge2(\AppBundle\Entity\Common\Language $mothertounge2 = null)
    {
        $this->mothertounge2 = $mothertounge2;

        return $this;
    }

    /**
     * Get mothertounge2
     *
     * @return \AppBundle\Entity\Common\Language
     */
    public function getMothertounge2()
    {
        return $this->mothertounge2;
    }

    /**
     * Set nda
     *
     * @param \AppBundle\Entity\Common\YesNoInProgress $nda
     *
     * @return Freelancer
     */
    public function setNda(\AppBundle\Entity\Common\YesNoInProgress $nda = null)
    {
        $this->nda = $nda;

        return $this;
    }

    /**
     * Get nda
     *
     * @return \AppBundle\Entity\Common\YesNoInProgress
     */
    public function getNda()
    {
        return $this->nda;
    }
    

    /**
     * Set catPrices
     *
     * @param boolean $catPrices
     *
     * @return Freelancer
     */
    public function setCatPrices($catPrices)
    {
        $this->catPrices = $catPrices;

        return $this;
    }

    /**
     * Get catPrices
     *
     * @return boolean
     */
    public function getCatPrices()
    {
        return $this->catPrices;
    }
    
    

    /**
     * Add price
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerPrice $price
     *
     * @return Freelancer
     */
    public function addPrice(\AppBundle\Entity\Freelancer\FreelancerPrice $price)
    {
        $price->setFreelancer($this);
        $this->prices[] = $price;

        return $this;
    }

    /**
     * Remove price
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerPrice $price
     */
    public function removePrice(\AppBundle\Entity\Freelancer\FreelancerPrice $price)
    {
        $this->prices->removeElement($price);
        $price->setFreelancer(null);
    }

    /**
     * Get prices
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPrices()
    {
        return $this->prices;
    }

    /**
     * Add sector
     *
     * @param \AppBundle\Entity\Common\Sector $sector
     *
     * @return Freelancer
     */
    public function addSector(\AppBundle\Entity\Common\Sector $sector)
    {
        $this->sectors[] = $sector;

        return $this;
    }

    /**
     * Remove sector
     *
     * @param \AppBundle\Entity\Common\Sector $sector
     */
    public function removeSector(\AppBundle\Entity\Common\Sector $sector)
    {
        $this->sectors->removeElement($sector);
    }

    /**
     * Get sectors
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSectors()
    {
        return $this->sectors;
    }

    /**
     * Add catTool
     *
     * @param \AppBundle\Entity\Common\CatTool $catTool
     *
     * @return Freelancer
     */
    public function addCatTool(\AppBundle\Entity\Common\CatTool $catTool)
    {
        $this->catTools[] = $catTool;

        return $this;
    }

    /**
     * Remove catTool
     *
     * @param \AppBundle\Entity\Common\CatTool $catTool
     */
    public function removeCatTool(\AppBundle\Entity\Common\CatTool $catTool)
    {
        $this->catTools->removeElement($catTool);
    }

    /**
     * Get catTools
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCatTools()
    {
        return $this->catTools;
    }

    /**
     * Set flPaymentType
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerPaymentType $flPaymentType
     *
     * @return Freelancer
     */
    public function setFlPaymentType(\AppBundle\Entity\Freelancer\FreelancerPaymentType $flPaymentType = null)
    {
        $this->flPaymentType = $flPaymentType;

        return $this;
    }

    /**
     * Get flPaymentType
     *
     * @return \AppBundle\Entity\Freelancer\FreelancerPaymentType
     */
    public function getFlPaymentType()
    {
        return $this->flPaymentType;
    }


    /**
     * Set flInvoicingType
     *
     * @param \AppBundle\Entity\Freelancer\FreelancerInvoicingType $flInvoicingType
     *
     * @return Freelancer
     */
    public function setFlInvoicingType(\AppBundle\Entity\Freelancer\FreelancerInvoicingType $flInvoicingType = null)
    {
        $this->flInvoicingType = $flInvoicingType;

        return $this;
    }

    /**
     * Get flInvoicingType
     *
     * @return \AppBundle\Entity\Freelancer\FreelancerInvoicingType
     */
    public function getFlInvoicingType()
    {
        return $this->flInvoicingType;
    }

    /**
     * Set createdBy
     *
     * @param \AppBundle\Entity\User $createdBy
     *
     * @return Freelancer
     */
    public function setCreatedBy(\AppBundle\Entity\User $createdBy = null)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy
     *
     * @return \AppBundle\Entity\User
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }
}
