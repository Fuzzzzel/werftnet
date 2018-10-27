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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Project\Order\OrderRepository")
 * @ORM\Table(name="Orders",
 *    uniqueConstraints={
 *        @ORM\UniqueConstraint(name="order_no_unique",
 *                 columns={"year", "number_in_year"})
 *    }
 * )
 */
class Order extends Project
{
    /**
     * @ORM\Column(type="integer", nullable=false)
     */
    protected $year;

    /**
     * @ORM\Column(type="integer", nullable=false)
     */
    protected $numberInYear;

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     * @JMS\Accessor(getter="getOrderNo")
     */
    protected $orderNo;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @JMS\Type("DateTime<'Y-m-d\TH:i'>")
     * @JMS\Groups({"display", "update"})
     */
    protected $deliveryDateDesired;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @JMS\Type("DateTime<'Y-m-d\TH:i'>")
     * @JMS\Groups({"display", "update"})
     */
    protected $deliveryDate;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Sector")
     * @ORM\JoinColumn(name="sector_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Sector")
     * @JMS\Groups({"display", "update"})
     */
    protected $sector;

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
     * @JMS\Groups({"display"})
     */
    protected $positions;

    public function __construct() {
        $this->positions = new ArrayCollection();
    }

    public function getYear() {
        $year = $this->getCreatedAt()->format('y');
        return intval($year);
    }

    public function setYear($year) {
        $this->year = $year;
        return $this;
    }

    public function setNumberInYear($numberInYear) {
        $this->numberInYear = $numberInYear;
        return $this;
    }

    public function getNumberInYear() {
        return $this->numberInYear;
    }

    public function getOrderNo() {
        $yearString = str_pad($this->getYear(),2,'0', STR_PAD_LEFT );
        $numberInYearString = str_pad($this->getNumberInYear(),4,'0', STR_PAD_LEFT );
        return $yearString . '-' . $numberInYearString;
    }

    public function setDeliveryDate($deliveryDate) {
        $this->deliveryDate = $deliveryDate;
        return $this;
    }

    public function getDeliveryDate() {
        return $this->deliveryDate;
    }

    public function setDeliveryDateDesired($deliveryDateDesired) {
        $this->deliveryDateDesired = $deliveryDateDesired;
        return $this;
    }

    public function getDeliveryDateDesired() {
        return $this->deliveryDateDesired;
    }

    public function setSector($sector) {
        $this->sector = $sector;
        return $this;
    }

    public function getSector() {
        return $this->sector;
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