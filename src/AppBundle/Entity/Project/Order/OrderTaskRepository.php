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

class OrderTaskRepository extends EntityRepository
{
    public function getMaxTaskNumberForPosition($positionId) {
        $qb = $this->createQueryBuilder('ot');
        $qb->select('ot, MAX(ot.taskNumber) as maxTaskNumber');
        $qb->leftJoin(Order::class, 'op', 'WITH', 'op.id = :positionId');
        $qb->where('op.id = :positionId');
        $qb->setParameter('positionId', $positionId);

        $q = $qb->getQuery();
        $queryResult = $q->getSingleResult();
        if($queryResult === null || $queryResult['maxTaskNumber'] === null) {
            $maxTaskNumber = 0;
        } else {
            $maxTaskNumber = $queryResult['maxTaskNumber'];
        }

        return $maxTaskNumber;
    }
}