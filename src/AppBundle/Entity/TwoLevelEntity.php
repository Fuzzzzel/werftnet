<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:04
 */

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\SimpleEntity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class TwoLevelEntity
 * @package AppBundle\Entity
 *
 **/
abstract class TwoLevelEntity extends SimpleEntity implements \JsonSerializable
{
    // Redeclare with Repository in implementing class
    protected $mainItem;
    protected $implementingClassName;

    public function __construct()
    {
        $this->implementingClassName = get_class($this);
        $this->mainItem = null;
    }

    /**
     * Set mainItem
     *
     * @param \AppBundle\Entity\TwoLevelEntity $mainItem
     *
     * @return \AppBundle\Entity\TwoLevelEntity
     */
    public function setMainItem(\AppBundle\Entity\TwoLevelEntity $mainItem = null)
    {
        // ToDo: Falls das Item bereits Subitems hat, darf sie kein Hauptitem kriegen!
        // ToDo: Evtl. muss das im Controller oder in OnBeforePersist abgefangen werden
        if ($mainItem === null || $mainItem->isMainItem()) {
            // Sprache darf nur einer Hauptsprache als Subsprache hinzugefügt werden
            $this->mainItem = $mainItem;
        }

        return $this;
    }

    /**
     * Get mainItem
     *
     * @return \AppBundle\Entity\TwoLevelEntity
     */
    public function getMainItem()
    {
        return $this->mainItem;
    }

    public function isMainItem()
    {
        return empty($this->getmainItem());
    }

}
