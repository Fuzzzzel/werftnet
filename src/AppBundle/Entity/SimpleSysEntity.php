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

abstract class SimpleSysEntity extends SimpleEntity
{
    /**
     * @ORM\Column(type="string", unique=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     */
    protected $value;

    /**
     * @ORM\Column(type="integer", unique=true)
     * @JMS\Type("integer")
     * @JMS\Groups({"display"})
     */
    protected $itemOrder;

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }
    
    public function getItemOrder() {
        return $this->itemOrder;
    }

    public function setItemOrder($itemOrder) {
        $this->itemOrder = $itemOrder;
    }
}