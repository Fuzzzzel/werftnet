<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 18:34
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

abstract class SimpleEntity implements \JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     */
    protected $name;

    // Getter und Setter

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    abstract public function getDisplayName();

    /**
     * @return object
     * Serialize only the properties needed
     */
    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }

    public function createSubItemObject($subItems, $subItemClass) {

        $vars = $vars = new \stdClass();

        // Array aus den Subvalues erstellen
        $subArray = array();
        foreach($subItems as $sub) {
            $subObj = new \stdClass();
            $subObj->id = $sub->getId();
            $subObj->name = $sub->getName();
            $subArray[] = $subObj;
        }

        $vars->values = $subArray;

        // Anzeigename SubEntity hinzufügen
        $subLang = new $subItemClass();
        $vars->display_name = $subLang->getDisplayName();

        return $vars;
    }
}