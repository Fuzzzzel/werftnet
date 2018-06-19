<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.09.2016
 * Time: 22:15
 */

namespace AppBundle\Entity\Customer;

use AppBundle\Entity\QueryHelper;
use Doctrine\ORM\EntityRepository;

class CustomerContactRepository extends EntityRepository
{
    public function findAllByCustomerId($customerId)
    {
        $qb = $this->createQueryBuilder('cc');

        $qb->join('cc.customer', 'c', 'WITH', 'c.id = :customerId');
        $qb->setParameter('customerId', $customerId);
        $qb->where('c.id = :customerId');
        $qb->setParameter('customerId', $customerId);

        $qb->orderBy('cc.name2');
        $qb->addOrderBy('cc.name1');
        $qb->distinct();

        $query = $qb->getQuery();

        return $query->getResult();
    }
}