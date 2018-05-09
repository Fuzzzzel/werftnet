<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 11:03
 */

namespace AppBundle\Entity\Freelancer;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\SimpleEntity;

/**
 * Class FreelancerPaymentType
 * @package AppBundle\Entity\Freelancer
 *
 * @ORM\Entity
 * @ORM\Table(name="FreelancerInvoicingType")
 */
class FreelancerInvoicingType extends SimpleEntity
{
    public function getDisplayName() {
        return "Rechnungsart";
    }
}
