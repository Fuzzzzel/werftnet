<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:04
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\TwoLevelEntity;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Sector
 * @package AppBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="AppBundle\Entity\TwoLevelEntityRepository")
 * @ORM\Table(name="Sector")
 */
class Sector extends TwoLevelEntity implements \JsonSerializable
{
    /**
     * Redeclaration of property to set relation
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Sector")
     * @JMS\Type("AppBundle\Entity\Common\Sector")
     * @JMS\Groups({"display"})
     */
    protected $mainItem;

    public function __construct()
    {
        // Call parent constructor to initialize class
        parent::__construct();
    }

    public function getDisplayName()
    {
        return "Fachgebiet";
    }
}
