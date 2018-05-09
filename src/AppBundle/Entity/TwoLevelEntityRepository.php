<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 03.08.2017
 * Time: 21:15
 */

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class TwoLevelEntityRepository extends EntityRepository
{
    public function findAllItems()
    {
        $q = $this->createQueryBuilder('item');

        $q->leftJoin('item.mainItem', 'mainItem');

        $q->orderBy('mainItem.name'); // Main items first, since their main language is null
        $q->addOrderBy('item.name');

        $result = $q->getQuery()
            ->getResult();

        return $result;
    }

    public function findAllSubItems($mainId) {

        // Falls Parameter nicht angegeben, null zurückgeben
        if (empty($mainId)) {
            return null;
        }

        $q = $this->createQueryBuilder('item');

        $q->where('item.mainItem = :mainId');

        $q->orderBy('item.name');

        $q->setParameter('mainId', $mainId);

        $result = $q->getQuery()
            ->getResult();

        return $result;
    }
}