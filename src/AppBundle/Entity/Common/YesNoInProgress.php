<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 22:50
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class YesNoInProgress
 * @package AppBundle\Entity\Common
 *
 * @ORM\Entity
 * @ORM\Table(name="YesNoInProgress")
 */
class YesNoInProgress extends SimpleEntity
{
    public function getDisplayName() {
        return "Ja/Nein/In Bearbeitung";
    }
}
