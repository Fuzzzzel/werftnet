<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 11.09.2016
 * Time: 22:15
 */

namespace AppBundle\Entity;


use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

class FreelancerRepository extends EntityRepository
{
    public function findAllBySearchParams($search = [], $limit = null, $page = null)
    {
        $qbSl = $this->_em->createQueryBuilder();
        $qbSl->select('ls_search.id');
        $qbSl->from('AppBundle:Common\\Language', 'ls_search');
        $qbSl->leftJoin('AppBundle:Common\\Language', 'mls', 'WITH', 'mls = ls_search.mainItem');
        $qbSl->where('mls.id = :lngSourceId or ls_search.id = :lngSourceId');

        $qbTl = $this->_em->createQueryBuilder();
        $qbTl->select('lt_search.id');
        $qbTl->from('AppBundle:Common\\Language', 'lt_search');
        $qbTl->leftJoin('AppBundle:Common\\Language', 'mlt', 'WITH', 'mlt = lt_search.mainItem');
        $qbTl->where('mlt.id = :lngTargetId or lt_search.id = :lngTargetId');

        $qbSector = $this->_em->createQueryBuilder();
        $qbSector->select('sec_search.id');
        $qbSector->from('AppBundle:Common\\Sector', 'sec_search');
        $qbSector->leftJoin('AppBundle:Common\\Sector', 'mainsec', 'WITH', 'mainsec = sec_search.mainItem');
        $qbSector->where('mainsec.id = :sectorId or sec_search.id = :sectorId');


        $qb = $this->createQueryBuilder('fl');

        if (isset($search['lng_source']) || isset($search['lng_target'])) {
            $qb->join('fl.prices', 'p', 'WITH', 'fl = p.freelancer');

            if(isset($search['lng_source']['id'])) {
                $qb->join('p.lngSource', 'ls');
                $qb->andWhere($qbSl->expr()->in('ls.id', $qbSl->getDQL()));
                $qb->setParameter('lngSourceId', $search['lng_source']['id']);
            }
            

            if (isset($search['lng_target']['id'])) {
                $qb->join('p.lngTarget', 'lt');
                $qb->andWhere($qbTl->expr()->in('lt.id', $qbTl->getDQL()));
                $qb->setParameter('lngTargetId', $search['lng_target']['id']);
            }

        }

        if (isset($search['fl_status']['id'])) {
            $qb->join('fl.flStatus', 'stat', 'WITH', 'stat.id = :flStatusId');
            $qb->setParameter('flStatusId', $search['fl_status']['id']);
        }

        if (isset($search['sector']['id'])) {
            $qb->join('fl.sectors', 'sect');
            $qb->andWhere($qbSl->expr()->in('sect.id', $qbSector->getDQL()));
            $qb->setParameter('sectorId', $search['sector']['id']);
        }

        if (isset($search['name'])) {
            $searchStrings = mbsplit('\s|,',$search['name']);
            for($i = 0; $i < sizeof($searchStrings); $i++) {
                $qb->andWhere('fl.name1 LIKE :name'.$i.' OR fl.name2 LIKE :name'.$i.' OR fl.companyName LIKE :name'.$i);
                $qb->setParameter('name'.$i, '%'. $searchStrings[$i] . '%');
            }
        }

        $qb->orderBy('fl.name2');
        $qb->addOrderBy('fl.name1');
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