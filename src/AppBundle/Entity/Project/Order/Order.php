<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 20:19
 */

namespace AppBundle\Entity\Project\Order;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

use AppBundle\Entity\Project\Project;

/**
 * Class Order
 * @package AppBundle\Entity\Project\Order
 *
 * @ORM\Entity
 * @ORM\Table(name="Orders")
 */
class Order extends Project
{
    /**
     * @ORM\Column(type="datetime")
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    protected $deliveryDateDesired;

    /**
     * @ORM\Column(type="datetime")
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    protected $deliveryDate;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Project\Order\OrderStatus")
     * @ORM\JoinColumn(name="status_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Project\Order\OrderStatus")
     * @JMS\Groups({"display", "update"})
     */
    protected $status;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Project\Order\OrderPosition", mappedBy="order")
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id")
     * @JMS\Type("ArrayCollection<AppBundle\Entity\Project\Order\OrderPosition>")
     * @JMS\Groups({"display", "update"})
     */
    protected $positions;

    public function __construct() {
        $this->positions = new ArrayCollection();
    }

    public function setDeliveryDate($deliveryDate) {
        $this->deliveryDate = $deliveryDate;
        return $this;
    }

    public function getDeliveryDate() {
        return $this->deliveryDate;
    }

    public function setStatus($status) {
        $this->status = $status;
        return $this;
    }

    public function getStatus() {
        return $this->status;
    }
    
    public function addPosition(OrderPosition $position) {
        $position->setOrder($this);
        $this->positions[] = $position;
        return $this;
    }

    public function removePosition(OrderPosition $position) {
        $position->setOrder(null);
        $this->positions->removeElement($position);
        return $this;
    }

    public function getPositions() {
        return $this->positions;
    }
}