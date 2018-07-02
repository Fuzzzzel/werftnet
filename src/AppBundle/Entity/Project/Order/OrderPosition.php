<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 22:47
 */

namespace AppBundle\Entity\Project\Order;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class OrderPosition
 * @package AppBundle\Project\Orderphp
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Project\Order\OrderPositionRepository")
 * @ORM\Table(name="OrderPosition")
 */
class OrderPosition
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Project\Order\Order", inversedBy="positions")
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id", onDelete="CASCADE")
     * @JMS\Type("AppBundle\Entity\Project\Order\Order")
     */
    private $order;

    /**
     * @ORM\Column(type="integer", nullable=false)
     * @JMS\Type("integer")
     * @JMS\Groups({"display"})
     */
    private $positionNumber;

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     * @JMS\Accessor(getter="getPosNoString")
     */
    private $posNoString;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @JMS\Type("float")
     * @JMS\Groups({"display", "update"})
     */
    private $customerPrice;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="lngSource_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    private $lngSource;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="lngTarget_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    private $lngTarget;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Project\Order\OrderTask", mappedBy="position")
     * @ORM\JoinColumn(name="position_id", referencedColumnName="id")
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Project\Order\OrderTask>")
     * @JMS\Groups({"display"})
     */
    private $tasks;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
    }

    // Getters and Setters

    public function getId() {
        return $this->id;
    }

    public function setOrder($order) {
        $this->order = $order;
        return $this;
    }

    public function getOrder() {
        return $this->order;
    }

    public function setPositionNumber($positionNumber) {
        $this->positionNumber = $positionNumber;
        return $this;
    }

    public function getPositionNumber() {
        return $this->positionNumber;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getPosNoString() {
        return str_pad($this->getPositionNumber(),2,'0', STR_PAD_LEFT );
    }

    public function setCustomerPrice($customerPrice) {
        $this->customerPrice = $customerPrice;
        return $this;
    }

    public function getCustomerPrice() {
        return $this->customerPrice;
    }

    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    public function getTitle() {
        return $this->title;
    }

    /**
     * Set lngSource
     *
     * @param \AppBundle\Entity\Common\Language $lngSource
     *
     * @return FreelancerPrice
     */
    public function setLngSource(\AppBundle\Entity\Common\Language $lngSource = null)
    {
        $this->lngSource = $lngSource;

        return $this;
    }

    /**
     * Get lngSource
     *
     * @return \AppBundle\Entity\Common\Language
     */
    public function getLngSource()
    {
        return $this->lngSource;
    }

    public function setLngTarget(\AppBundle\Entity\Common\Language $lngTarget = null)
    {
        $this->lngTarget = $lngTarget;

        return $this;
    }

    public function getLngTarget()
    {
        return $this->lngTarget;
    }

    public function addTask(OrderTask $task) {
        $task->setPosition($this);
        $this->tasks[] = $task;
        return $this;
    }

    public function removeTask(OrderTask $task) {
        $task->setPosition(null);
        $this->tasks->removeElement($task);
        return $this;
    }

    public function getTasks() {
        return $this->tasks;
    }
}