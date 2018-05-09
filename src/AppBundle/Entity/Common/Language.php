<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:04
 */

namespace AppBundle\Entity\Common;

use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\TwoLevelEntity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Language
 * @package AppBundle\Entity\Common
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\TwoLevelEntityRepository")
 * @ORM\Table(name="Language")
 */
class Language extends TwoLevelEntity
{
    /**
     * Redeclaration of property to set relation
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @JMS\Type("AppBundle\Entity\Common\Language")
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
        return "Sprache";
    }
}
