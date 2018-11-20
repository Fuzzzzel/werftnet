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
 * Class OrderTask
 * @package AppBundle\Project\Orderphp
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Project\Order\OrderTaskRepository")
 * @ORM\Table(name="OrderTask")
 */
class OrderTask
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
     * @JMS\Type("integer")
     * @JMS\Groups({"display"})
     * @JMS\Accessor(getter="getPositionId")
     */
    protected $positionId;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Project\Order\OrderPosition", inversedBy="tasks")
     * @ORM\JoinColumn(name="position_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     * @JMS\Type("AppBundle\Entity\Project\Order\OrderPosition")
     */
    private $position;

    /**
     * @ORM\Column(type="integer", nullable=false)
     * @JMS\Type("integer")
     * @JMS\Groups({"display"})
     */
    private $taskNumber;

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     * @JMS\Accessor(getter="getTaskNoString")
     */
    private $taskNoString;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    private $createdAt;
    
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
     * @ORM\Column(type="datetime", nullable=true)
     * @JMS\Type("DateTime<'Y-m-d\TH:i'>")
     * @JMS\Groups({"display", "update"})
     */
    private $deliveryDate;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\Freelancer")
     * @ORM\JoinColumn(name="freelancer_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Freelancer\Freelancer")
     * @JMS\Groups({"display", "update"})
     */
    private $freelancer;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @JMS\Type("float")
     * @JMS\Groups({"display", "update"})
     */
    private $taskPrice;

    public function __construct()
    {

    }

    // Getters and Setters

    public function getId() {
        return $this->id;
    }

    public function setPosition($position) {
        $this->position = $position;
        return $this;
    }

    /**
     * @return OrderPosition
     */
    public function getPosition() {
        return $this->position;
    }

    public function setFreelancer($freelancer) {
        $this->freelancer = $freelancer;
        return $this;
    }

    /**
     * @return OrderFreelancer
     */
    public function getFreelancer() {
        return $this->freelancer;
    }

    public function setTaskNumber($taskNumber) {
        $this->taskNumber = $taskNumber;
        return $this;
    }

    /**
     * @return integer
     */
    public function getTaskNumber() {
        return $this->taskNumber;
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
    public function getTaskNoString() {
        $position = $this->getPosition();
        $positionNumberString = $position->getPosNoString();
        $taskNumberString = str_pad($this->getTaskNumber(),3,'0', STR_PAD_LEFT );
        $order = $position->getOrder();
        return $order->getOrderNo() . '-' . $positionNumberString . '-' . $taskNumberString;
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

    public function setTaskPrice($taskPrice) {
        $this->taskPrice = $taskPrice;
        return $this;
    }

    public function setDeliveryDate($deliveryDate) {
        $this->deliveryDate = $deliveryDate;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDeliveryDate() {
        return $this->deliveryDate;
    }

    /**
     * @return float
     */
    public function getTaskPrice() {
        return $this->taskPrice;
    }

    public function resetTitleToPositionLangCombo() {
        if($this->getPosition() !== null && $this->getPosition()->getLngSource() !== null && $this->getPosition()->getLngTarget()) {
            $title = $this->getPosition()->getLngSource()->getName() . ' → ' . $this->getPosition()->getLngTarget()->getName();
            $this->title = $title;
        }
    }

    public function getOrderId() {
        $position = $this->getPosition();
        $order = $position === null ? null : $position->getOrder();

        if($order !== null ) {
            return $order->getId();
        } else {
            return null;
        }
    }

    public function getPositionId() {
        $position = $this->getPosition();
        if($position !== null) {
            return $position->getId();
        } else {
            return null;
        }
    }
}