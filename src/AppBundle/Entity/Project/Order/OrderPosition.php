<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 22:47
 */

namespace AppBundle\Entity\Project\Order;

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
     * @ORM\Column(type="integer")
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
     * @ORM\Column(type="datetime")
     * @JMS\Type("DateTime")
     * @JMS\Groups({"display"})
     */
    private $createdAt;

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
        return $this->order->getOrderNo() .'-' . str_pad($this->getPositionNumber(),2,'0', STR_PAD_LEFT );
    }
}