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
 * @ORM\Entity
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

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }
}