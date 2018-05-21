<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 13.09.2016
 * Time: 21:04
 */

namespace AppBundle\Entity\Common;

use AppBundle\Entity\Common\Anrede;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

abstract class Person extends Contact
{
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Anrede")
     * @ORM\JoinColumn(name="anrede_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Anrede")
     * @JMS\Groups({"display", "update"})
     */
    protected $anrede;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @JMS\Type("DateTime<'Y-m-d'>")
     * @JMS\Groups({"display", "update"})
     */
    protected $dateOfBirth;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="correspond_language_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    protected $correspondLanguage;

    /**
     * Set anrede
     *
     * @param \AppBundle\Entity\Common\Anrede $anrede
     *
     * @return mixed
     */
    public function setAnrede(Anrede $anrede = null)
    {
        $this->anrede = $anrede;

        return $this;
    }

    /**
     * Get anrede
     *
     * @return \AppBundle\Entity\Common\Anrede
     */
    public function getAnrede()
    {
        return $this->anrede;
    }
    
    /**
     * Set dateOfBirth
     *
     * @param \AppBundle\Entity\Common\Anrede $dateOfBirth
     *
     * @return mixed
     */
    public function setDateOfBirth(\DateTime $dateOfBirth = null)
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    /**
     * Get dateOfBirth
     *
     * @return \AppBundle\Entity\Common\Anrede
     */
    public function getDateOfBirth()
    {
        return $this->dateOfBirth;
    }

    /**
     * Set correspondLanguage
     *
     * @param \AppBundle\Entity\Common\Anrede $correspondLanguage
     *
     * @return mixed
     */
    public function setCorrespondLanguage(Language $correspondLanguage = null)
    {
        $this->correspondLanguage = $correspondLanguage;

        return $this;
    }

    /**
     * Get correspondLanguage
     *
     * @return \AppBundle\Entity\Common\Anrede
     */
    public function getCorrespondLanguage()
    {
        return $this->correspondLanguage;
    }
}