<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 18:45
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class Freelancer
 * @package AppBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="Country")
 *
 */
class Country extends SimpleEntity
{
    public function getDisplayName() {
        return "Land";
    }
}
