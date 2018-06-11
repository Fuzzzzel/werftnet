<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.06.2018
 * Time: 23:09
 */

namespace AppBundle\Entity\Project\Order;


use AppBundle\Entity\SimpleEntity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class OrderStatus
 * @package AppBundle\Project\Order
 *
 * @ORM\Entity
 * @ORM\Table(name="OrderStatus")
 */
class OrderStatus extends SimpleEntity
{
    public function getDisplayName()
    {
        return 'Auftragsstatus';
    }
}