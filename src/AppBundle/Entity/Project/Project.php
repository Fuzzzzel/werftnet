<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 20:06
 */

namespace AppBundle\Entity\Project;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\CustomerContact;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

abstract class Project
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\Customer")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\Customer")
     * @JMS\Groups({"display", "update"})
     */
    protected $customer;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Customer\CustomerContact")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Customer\CustomerContact")
     * @JMS\Groups({"display", "update"})
     */
    protected $customerContact;

    /**
     * @ORM\Column(type="datetime")
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="string")
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $title;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $description;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    protected $numberOfFiles;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $sourceFormat;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $targetFormat;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $comment;


    public function getId() {
        return $this->id;
    }


    public function setCustomer(Customer $customer) {
        $this->customer = $customer;
        return $this;
    }

    public function getCustomer() {
        return $this->customer;
    }

    public function setCustomerContact(CustomerContact $customerContact) {
        $this->customerContact = $customerContact;
        return $this;
    }

    public function getCustomerContact() {
        return $this->customerContact;
    }


    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }


    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    public function getTitle() {
        return $this->title;
    }


    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    public function getDescription() {
        return $this->description;
    }


    public function setNumberOfFiles($numberOfFiles) {
        $this->numberOfFiles = $numberOfFiles;
        return $this;
    }

    public function getNumberOfFiles() {
        return $this->numberOfFiles;
    }


    public function setSourceFormat($sourceFormat) {
        $this->sourceFormat = $sourceFormat;
        return $this;
    }

    public function getSourceFormat() {
        return $this->sourceFormat;
    }


    public function setTargetFormat($targetFormat) {
        $this->targetFormat = $targetFormat;
        return $this;
    }

    public function getTargetFormat() {
        return $this->targetFormat;
    }


    public function setComment($comment) {
        $this->comment = $comment;
        return $this;
    }

    public function getComment() {
        return $this->comment;
    }
}