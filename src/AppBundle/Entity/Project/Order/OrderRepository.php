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

class OrderRepository extends EntityRepository
{
    public function findAllBySearchParams($search = [], $limit = null, $page = null)
    {
        $qb = $this->createQueryBuilder('o');

        if (isset($search['status'])) {
            $qb->join('o.status', 's', 'WITH', 's.id = :statusId');
            $qb->setParameter('statusId', $search['status']['id']);
        }

        if (isset($search['search_text']) && $search['search_text'] != "") {
            $searchStrings = mbsplit('\s|,', $search['search_text']);
            for ($i = 0; $i < sizeof($searchStrings); $i++) {
                $qb->andWhere('o.title LIKE :search_text' . $i . ' OR o.description LIKE :search_text' . $i);
                $qb->setParameter('search_text' . $i, '%' . $searchStrings[$i] . '%');
            }
        }

        if (isset($search['customer'])) {
            $qb->join('o.customer', 'c', 'WITH', 'c.id = :customerId');
            $qb->setParameter('customerId', $search['customer']['id']);
        }

        $qb->orderBy('o.deliveryDate');
        $qb->distinct();

        $query = $qb->getQuery();

        if (intval($page) === 0) {
            // Get unpaginated result
            if ($limit > 0) {
                $query->setMaxResults($limit);
            }
            return $query->getResult();
        } else {
            $qHelper = new QueryHelper();
            $paginator = $qHelper->paginate($query, $page, $limit);
            return $qHelper->getPaginatedResult($paginator);
        }
    }
}