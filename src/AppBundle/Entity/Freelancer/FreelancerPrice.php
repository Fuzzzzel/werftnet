<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 20:19
 */

namespace AppBundle\Entity\Freelancer;

use AppBundle\Entity\Common\PriceLine;
use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Common\Service;
use AppBundle\Entity\Common\PriceUnit;
use AppBundle\Entity\Freelancer\Freelancer;
use JMS\Serializer\Annotation as JMS;

/**
 * Class FreelancerPrice
 * @package AppBundle\Entity\Freelancer
 *
 * @ORM\Entity
 * @ORM\Table(name="FreelancerPrice")
 */
class FreelancerPrice Extends PriceLine
{
    /**
     * @ORM\Column(type="float")
     * @JMS\Type("double")
     * @JMS\Groups({"display", "update"})
     */
    private $minimumPrice;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Freelancer\Freelancer", inversedBy="prices")
     * @ORM\JoinColumn(name="freelancer_id", referencedColumnName="id", onDelete="CASCADE")
     * @JMS\Type("AppBundle\Entity\Freelancer\Freelancer")
     */
    private $freelancer;


    /**
     * Set minimumPrice
     *
     * @param float $minimumPrice
     *
     * @return FreelancerPrice
     */
    public function setMinimumPrice($minimumPrice)
    {
        $this->minimumPrice = $minimumPrice;

        return $this;
    }

    /**
     * Get minimumPrice
     *
     * @return float
     */
    public function getMinimumPrice()
    {
        return $this->minimumPrice;
    }

    /**
     * Set freelancer
     *
     * @param \AppBundle\Entity\Freelancer\Freelancer $freelancer
     *
     * @return FreelancerPrice
     */
    public function setFreelancer(\AppBundle\Entity\Freelancer\Freelancer $freelancer = null)
    {
        $this->freelancer = $freelancer;

        return $this;
    }

    /**
     * Get freelancer
     *
     * @return \AppBundle\Entity\Freelancer\Freelancer
     */
    public function getFreelancer()
    {
        return $this->freelancer;
    }
}
