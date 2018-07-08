<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 22:47
 */

namespace AppBundle\Entity\Project\Order;

use AppBundle\Entity\Common\PriceLine;
use AppBundle\Entity\Freelancer\FreelancerPrice;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class OrderTask
 * @package AppBundle\Project\Order
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Project\Order\OrderTaskRepository")
 */
class OrderTaskPrice extends PriceLine
{
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Project\Order\OrderTaskPrice", inversedBy="prices")
     * @ORM\JoinColumn(name="position_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     * @JMS\Type("AppBundle\Entity\Project\Order\OrderTaskPrice")
     */
    private $task;

    public function setTask($task) {
        $this->task = $task;
        return $this;
    }

    public function getTask() {
        return $this->task;
    }
}