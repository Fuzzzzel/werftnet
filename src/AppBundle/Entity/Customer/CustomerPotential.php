<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:02
 */

namespace AppBundle\Entity\Customer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class Service
 * @package AppBundle\Entity\Customer
 *
 * @ORM\Entity
 * @ORM\Table(name="CustomerPotential")
 */
class CustomerPotential extends SimpleEntity
{
    public function getDisplayName() {
        return "Potenzial";
    }
}
