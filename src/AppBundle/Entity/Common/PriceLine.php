<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 20:19
 */

namespace AppBundle\Entity\Common;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\Common\Service;
use AppBundle\Entity\Common\PriceUnit;
use AppBundle\Entity\Freelancer\Freelancer;
use JMS\Serializer\Annotation as JMS;

abstract class PriceLine
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="lngSource_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    protected $lngSource;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Language")
     * @ORM\JoinColumn(name="lngTarget_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Language")
     * @JMS\Groups({"display", "update"})
     */
    protected $lngTarget;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Service")
     * @ORM\JoinColumn(name="service_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Service")
     * @JMS\Groups({"display", "update"})
     */
    protected $service;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\PriceUnit")
     * @ORM\JoinColumn(name="priceunit_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\PriceUnit")
     * @JMS\Groups({"display", "update"})
     */
    protected $priceUnit;

    /**
     * @ORM\Column(type="float")
     * @JMS\Type("double")
     * @JMS\Groups({"display", "update"})
     */
    protected $pricePerUnit;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Common\Currency")
     * @ORM\JoinColumn(name="currency_id", referencedColumnName="id")
     * @JMS\Type("AppBundle\Entity\Common\Currency")
     * @JMS\Groups({"display", "update"})
     */
    protected $currency;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set lngSource
     *
     * @param \AppBundle\Entity\Common\Language $lngSource
     *
     * @return PriceLine
     */
    public function setLngSource(\AppBundle\Entity\Common\Language $lngSource = null)
    {
        $this->lngSource = $lngSource;

        return $this;
    }

    /**
     * Get lngSource
     *
     * @return \AppBundle\Entity\Common\Language
     */
    public function getLngSource()
    {
        return $this->lngSource;
    }

    /**
     * Set lngTarget
     *
     * @param \AppBundle\Entity\Common\Language $lngTarget
     *
     * @return PriceLine
     */
    public function setLngTarget(\AppBundle\Entity\Common\Language $lngTarget = null)
    {
        $this->lngTarget = $lngTarget;

        return $this;
    }

    /**
     * Get lngTarget
     *
     * @return \AppBundle\Entity\Common\Language
     */
    public function getLngTarget()
    {
        return $this->lngTarget;
    }

    
    /**
     * Set pricePerUnit
     *
     * @param float $pricePerUnit
     *
     * @return PriceLine
     */
    public function setPricePerUnit($pricePerUnit)
    {
        $this->pricePerUnit = $pricePerUnit;

        return $this;
    }

    /**
     * Get pricePerUnit
     *
     * @return float
     */
    public function getPricePerUnit()
    {
        return $this->pricePerUnit;
    }

    /**
     * Set service
     *
     * @param \AppBundle\Entity\Common\Service $service
     *
     * @return PriceLine
     */
    public function setService(\AppBundle\Entity\Common\Service $service = null)
    {
        $this->service = $service;

        return $this;
    }

    /**
     * Get service
     *
     * @return \AppBundle\Entity\Common\Service
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * Set priceUnit
     *
     * @param \AppBundle\Entity\Common\PriceUnit $priceUnit
     *
     * @return PriceLine
     */
    public function setPriceUnit(\AppBundle\Entity\Common\PriceUnit $priceUnit = null)
    {
        $this->priceUnit = $priceUnit;

        return $this;
    }

    /**
     * Get priceUnit
     *
     * @return \AppBundle\Entity\Common\PriceUnit
     */
    public function getPriceUnit()
    {
        return $this->priceUnit;
    }

    /**
     * Set currency
     *
     * @param \AppBundle\Entity\Common\Currency $currency
     *
     * @return PriceLine
     */
    public function setCurrency(\AppBundle\Entity\Common\Currency $currency = null)
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * Get currency
     *
     * @return \AppBundle\Entity\Common\Currency
     */
    public function getCurrency()
    {
        return $this->currency;
    }


}
