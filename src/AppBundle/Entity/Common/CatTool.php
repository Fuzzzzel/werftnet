<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:08
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class CatTool
 * @package AppBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="CatTool")
 */
class CatTool extends SimpleEntity
{
    public function getDisplayName() {
        return "CAT-Tool";
    }
}
