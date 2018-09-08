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
     * @JMS\Type("integer")
     * @JMS\Groups({"display"})
     * @JMS\Accessor(getter="getOrderId")
     */
    protected $orderId;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Project\Order\Order", inversedBy="positions")
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
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
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $internalNote;

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

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    public function setOrder($order) {
        $this->order = $order;
        return $this;
    }

    /**
     * @return Order
     */
    public function getOrder() {
        return $this->order;
    }

    public function getOrderId() {
        if ($this->getOrder() !== null) {
            return $this->getOrder()->getId();
        } else {
            return null;
        }
    }

    public function setPositionNumber($positionNumber) {
        $this->positionNumber = $positionNumber;
        return $this;
    }

    /**
     * @return integer
     */
    public function getPositionNumber() {
        return $this->positionNumber;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt() {
        return $this->createdAt;
    }

    /**
     * @return string
     */
    public function getPosNoString() {
        return str_pad($this->getPositionNumber(),2,'0', STR_PAD_LEFT );
    }

    public function setCustomerPrice($customerPrice) {
        $this->customerPrice = $customerPrice;
        return $this;
    }

    /**
     * @return float
     */
    public function getCustomerPrice() {
        return $this->customerPrice;
    }

    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle() {
        return $this->title;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    public function setInternalNote($internalNote) {
        $this->internalNote = $internalNote;
        return $this;
    }

    /**
     * @return string
     */
    public function getInternalNote() {
        return $this->internalNote;
    }

    /**
     * Set lngSource
     *
     * @param \AppBundle\Entity\Common\Language $lngSource
     *
     * @return OrderPosition
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

    /**
     * Get lngTarget
     *
     * @return \AppBundle\Entity\Common\Language
     */
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