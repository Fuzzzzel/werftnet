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
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Project\Order\OrderTaskPrice", mappedBy="task")
     * @ORM\JoinColumn(name="position_id", referencedColumnName="id")
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Project\Order\OrderTaskPrice>")
     * @JMS\Groups({"display"})
     */
    private $prices;

    public function __construct()
    {
        $this->prices = new ArrayCollection();
    }

    // Getters and Setters

    public function getId() {
        return $this->id;
    }

    public function setPosition($position) {
        $this->position = $position;
        return $this;
    }

    public function getPosition() {
        return $this->position;
    }

    public function setTaskNumber($taskNumber) {
        $this->taskNumber = $taskNumber;
        return $this;
    }

    public function getTaskNumber() {
        return $this->taskNumber;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getTaskNoString() {
        $position = $this->getPosition();
        $order = $position->getOrder();
        return $order->getOrderNo() . '-' . str_pad($this->getTaskNumber(),3,'0', STR_PAD_LEFT );
    }

    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    public function getTitle() {
        return $this->title;
    }

    public function addPrice(OrderTaskPrice $price) {
        $price->setTask($this);
        $this->prices[] = $price;
        return $this;
    }

    public function removePrice(OrderTaskPrice $price) {
        $price->setTask(null);
        $this->prices->removeElement($price);
        return $this;
    }

    public function getPrices() {
        return $this->prices;
    }

    public function resetTitleToPositionLangCombo() {
        if($this->getPosition() !== null && $this->getPosition()->getLngSource() !== null && $this->getPosition()->getLngTarget()) {
            $title = $this->getPosition()->getLngSource()->getName() . ' → ' . $this->getPosition()->getLngTarget()->getName();
            $this->title = $title;
        }
    }
}