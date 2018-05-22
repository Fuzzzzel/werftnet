<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 22.05.2018
 * Time: 00:39
 */

namespace AppBundle\Entity\Settings;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Freelancer
 * @package AppBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="AppSettings")
 */
class AppSettings
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     */
    private $id = 1;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    private $imprint;

    public function getId() {
        return $this->id;
    }

    public function getImprint() {
        return $this->imprint;
    }

    public function setImprint($imprint) {
        $this->imprint = $imprint;

        return $this;
    }
}