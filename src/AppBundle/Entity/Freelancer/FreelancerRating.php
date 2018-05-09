<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:02
 */

namespace AppBundle\Entity\Freelancer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class Service
 * @package AppBundle\Entity\Common
 *
 * @ORM\Entity
 * @ORM\Table(name="FreelancerRating")
 */
class FreelancerRating extends SimpleEntity
{
    public function getDisplayName() {
        return "Rating";
    }
}
