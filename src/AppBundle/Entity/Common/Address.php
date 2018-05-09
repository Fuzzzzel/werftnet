<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 10.07.2016
 * Time: 22:13
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Address
 * @package AppBundle\Entity\Common
 *
 */
abstract class Address
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
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $street;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $street2;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $zipcode;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update"})
     */
    protected $city;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Country")
     * @ORM\JoinColumn(name="country_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Country")
     * @JMS\Groups({"display", "update"})
     */
    protected $country;
}