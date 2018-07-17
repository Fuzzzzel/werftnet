<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 11:39
 */


namespace AppBundle\Entity\Project\Order;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\QueryHelper;

class OrderPositionRepository extends EntityRepository
{
    public function getMaxPositionNumberForOrder($orderId) {
        $qb = $this->createQueryBuilder('op');
        $qb->select('op, MAX(op.positionNumber) as maxPositionNumber');
        $qb->join('op.order', 'o', 'WITH', 'o = op.order');
        $qb->where('o.id = :orderId');
        $qb->setParameter('orderId', $orderId);

        $q = $qb->getQuery();
        $queryResult = $q->getSingleResult();
        if($queryResult === null || $queryResult['maxPositionNumber'] === null) {
            $maxPositionNumber = 0;
        } else {
            $maxPositionNumber = $queryResult['maxPositionNumber'];
        }

        return $maxPositionNumber;
    }
}