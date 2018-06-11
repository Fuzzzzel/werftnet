<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 19:17
 */

namespace AppBundle\Entity\Freelancer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Common\Address;
use JMS\Serializer\Annotation as JMS;

/**
 * Class Address
 * @package AppBundle\Entity\Freelancer
 *
 * @ORM\Entity
 * @ORM\Table(name="FreelancerAddress")
 */
class FreelancerAddress extends Address
{
    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Freelancer\Freelancer", mappedBy="address")
     * @ORM\JoinColumn(name="freelancer_id", referencedColumnName="id", onDelete="SET NULL")
     * @JMS\Type("AppBundle\Entity\Freelancer\Freelancer")
     */
    private $freelancer;

    /**
     * Constructor
     */
    public function __construct()
    {

    }

    /**
     * Set freelancer
     *
     * @param \AppBundle\Entity\Freelancer $freelancer
     *
     * @return FreelancerAddress
     */
    public function setFreelancer(\AppBundle\Entity\Freelancer\Freelancer $freelancer)
    {
        $this->freelancer = $freelancer;

        return $this;
    }

    /**
     * Get freelancer
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFreelancer()
    {
        return $this->freelancer;
    }
}
