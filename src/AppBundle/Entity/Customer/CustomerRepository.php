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

class CustomerRepository extends EntityRepository
{
    public function findAllBySearchParams($search = [], $limit = null, $page = null)
    {
        $qb = $this->createQueryBuilder('c');

        if (isset($search['origin'])) {
            $qb->join('c.origin', 'o', 'WITH', 'o.id = :cOriginId');
            $qb->setParameter('cOriginId', $search['origin']['id']);
        }

        if (isset($search['potential'])) {
            $qb->join('c.potential', 'p', 'WITH', 'p.id = :potentialId');
            $qb->setParameter('potentialId', $search['potential']['id']);
        }

        if (isset($search['account_manager'])) {
            $qb->join('c.accountManager', 'am', 'WITH', 'am.id = :amId');
            $qb->setParameter('amId', $search['account_manager']['id']);
        }

        if (isset($search['status'])) {
            $qb->join('c.status', 's', 'WITH', 's.id = :statusId');
            $qb->setParameter('statusId', $search['status']['id']);
        }

        if (isset($search['lastContactDateAfter'])  && $search['lastContactDateAfter'] !== "") {
            $qb->andWhere('c.lastContactDate >= :lastContactDateAfter');
            $qb->setParameter('lastContactDateAfter', $search['lastContactDateAfter']);
        }

        if (isset($search['lastContactDateBefore']) && $search['lastContactDateBefore'] !== "") {
            $qb->andWhere('c.lastContactDate <= :lastContactDateBefore');
            $qb->setParameter('lastContactDateBefore', $search['lastContactDateBefore']);
        }

        if (isset($search['name']) && $search['name'] != "") {
            $searchStrings = mbsplit('\s|,',$search['name']);
            for($i = 0; $i < sizeof($searchStrings); $i++) {
                $qb->andWhere('c.name1 LIKE :name'.$i.' OR c.name2 LIKE :name'.$i);
                $qb->setParameter('name'.$i, '%'. $searchStrings[$i] . '%');
            }
        }

        if (isset($search['asp_name']) && $search['asp_name'] != "") {
            $qb->leftjoin('c.contacts', 'cc', 'WITH', 'cc.customer = c');
            $searchStrings = mbsplit('\s|,',$search['asp_name']);
            for($i = 0; $i < sizeof($searchStrings); $i++) {
                $qb->andWhere('cc.name1 LIKE :asp_name'.$i.' OR cc.name2 LIKE :asp_name'.$i);
                $qb->setParameter('asp_name'.$i, '%'. $searchStrings[$i] . '%');
            }
        }

        $qb->orderBy('c.name2');
        $qb->addOrderBy('c.name1', 'ASC');
        $qb->distinct();

        $query = $qb->getQuery();

        if (intval($page) === 0)
        {
            // Get unpaginated result
            if($limit > 0) {
                $query->setMaxResults($limit);
            }
            return $query->getResult();
        }
        else
        {
            $qHelper = new QueryHelper();
            $paginator = $qHelper->paginate($query, $page, $limit);
            return $qHelper->getPaginatedResult($paginator);
        }
    }
}