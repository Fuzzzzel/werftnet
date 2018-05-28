<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 20.08.2017
 * Time: 12:40
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Tools\Pagination\Paginator;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;

class QueryHelper
{
    /**
     * Paginator Helper
     *
     * Pass through a query object, current page & limit
     * the offset is calculated from the page and limit
     * returns an `Paginator` instance, which you can call the following on:
     *
     *     $paginator->getIterator()->count() # Total fetched (ie: `5` posts)
     *     $paginator->count() # Count of ALL posts (ie: `20` posts)
     *     $paginator->getIterator() # ArrayIterator
     *
     * @param \Doctrine\ORM\Query $dql   DQL Query Object or QueryBuilder
     * @param integer            $page  Current page (defaults to 1)
     * @param integer            $limit The total number per page (defaults to 10)
     *
     * @return \Doctrine\ORM\Tools\Pagination\Paginator
     */
    public static function paginate($dql, $page = 1, $limit = 10)
    {
        $paginator = new Paginator($dql, false);

        if ($page < 1)
            $page = 1;
        /*
        if($limit < 20)
            $limit = 20;
        */

        $paginator->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        return $paginator;
    }

    public static function getPaginatedResult(\Doctrine\ORM\Tools\Pagination\Paginator $paginator) {
        $result = new \stdClass();
        $result->items = $paginator->getQuery()->getResult();
        $result->itemsTotal = $paginator->count();
        $result->itemsPerPage = $paginator->getQuery()->getMaxResults();
        $result->page = ceil(($paginator->getQuery()->getFirstResult() + 1) / $result->itemsPerPage);
        $result->pageMax = ceil($result->itemsTotal / $result->itemsPerPage);

        return $result;
    }

    public static function getSerializableResult(\stdClass $paginatedResult) {
        // Liefern der Suche als Ergebnis (JSON)
        $serializer = SerializerBuilder::create()->build();

        $itemListTemp = $serializer->serialize(
            $paginatedResult->items,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );

        $paginatedResult->items = json_decode($itemListTemp, true);

        return $paginatedResult;
    }

    public static function getFullEntityName($entityName) {
        $collections = array("Freelancer", "Customer", "User");
        $entityName = ucfirst($entityName);
        $found = false;
        for($i = 0; $i < count($collections); $i++) {
            if(strrpos($entityName, $collections[$i]) === 0) {
                $entityName = $collections[$i] . "\\" . $entityName;
                $found = true;
                break;
            }
        }

        if(!$found) {
            $entityName = "Common\\".$entityName;
        }

        return $entityName;
    }
}