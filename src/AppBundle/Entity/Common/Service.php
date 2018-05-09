<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 20:24
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class Service
 * @package AppBundle\Entity\Common
 *
 * @ORM\Entity
 * @ORM\Table(name="Service")
 */
class Service extends SimpleEntity
{
    public function getDisplayName() {
        return "Dienstleistung";
    }
}
