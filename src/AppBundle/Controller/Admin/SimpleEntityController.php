<?php
/**
 * Hinzufügen, Ändern und Löschen eines Objekts, welches
 * von SimpleEntity erbt
 */

namespace AppBundle\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\SimpleEntity;
use Doctrine\Common\Util\Inflector as Inflector;
use AppBundle\Entity\QueryHelper;

class SimpleEntityController extends Controller
{
    /**
     * @param $entityName
     * @return \stdClass
     *
     * !! Duplicated in DefualtsController --> Move to service?!
     */
    public function getSimpleEntityCollection($entityName)
    {
        $simpleEntities = new \stdClass;
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $simpleEntities->values = $this->getDoctrine()
            ->getRepository($classname)
            ->findBy(
                array(),
                array('name' => 'ASC')
            );

        $simpleObj = new $classname();
        $simpleEntities->display_name = $simpleObj->getDisplayName();


        return $simpleEntities;
    }

    public function getSimpleEntityById($entityName, $id)
    {
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $simpleEntity = $this->getDoctrine()
            ->getRepository($classname)
            ->findOneBy(
                array('id' => $id)
            );

        return $simpleEntity;
    }

    /**
     * @param $entityName
     * @return object
     * @Method("GET")
     * @Route("/admin/simple_entity/{entityName}", name="fetchSimpleEntity")
     */
    public function fetchSimpleEntity($entityName)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getSimpleEntityCollection($entityName);
        return new JsonResponse($result);
    }

    /**
     * @param $entityName
     * @return object
     * @Method("GET")
     * @Route("/admin/simple_entity/{entityName}/{id}", name="fetchSimpleEntityById")
     */
    public function fetchSimpleEntityById($entityName, $id)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getSimpleEntityById($entityName, $id);
        if($result == null) {
            throw $this->createNotFoundException("Entity {$entityName} mit der Id {$id} konnte nicht gefunden werden");
        }
        return new JsonResponse($result);
    }


    /**
     * @param String $entityName
     * @param Request $request
     * @return object
     * @Method("POST")
     * @Route("/admin/simple_entity/{entityName}", name="createSimpleEntityItem")
     */
    public function createSimpleEntityItem($entityName, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $newItemName = $params->newItemName;
        $entityName = QueryHelper::getFullEntityName($entityName);

        $classname = "\\AppBundle\\Entity\\" . $entityName;
        $newItem = new $classname();
        $newItem->setName($newItemName);

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $em->getRepository($classname)->findOneBy(
            array('name' => $newItemName)
        );

        // Falls ja, nicht hinzufügen
        if (($exists != null) && ($newItemName != "")) {
            $response = new Response("Item mit diesem Namen {$newItemName} existiert bereits", Response::HTTP_BAD_REQUEST);
            return $response;
        }

        $em->persist($newItem);
        $em->flush();

        return new JsonResponse($newItem);
    }

    /**
     * @param String $entityName
     * @param Integer $id
     * @param Request $request
     * @return null
     * @Method("DELETE")
     * @Route("/admin/simple_entity/{entityName}/{id}", name="deleteSimpleEntityItem")
     */
    function deleteSimpleEntityItem($entityName, $id, Request $request)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $entityToRemove = $em->getRepository($classname)->findOneBy(
            array('id' => $id)
        );

        // Falls ja, nicht hinzufügen
        if ($entityToRemove == null) {
            throw $this->createNotFoundException("Das zu löschende Item existiert nicht mehr");
        }

        // Falls nein, der Datenbank hinzufügen und mit id zurückgeben
        $em->remove($entityToRemove);
        $em->flush();

        return new JsonResponse();
    }

    /**
     * @param String $entityName
     * @param Integer $id
     * @param Request $request
     * @return null
     * @Method("POST")
     * @Route("admin/simple_entity/{entityName}/{id}", name="updateSimpleEntityItem")
     */
    function updateSimpleEntityItem($entityName, $id, Request $request)
    {
        // $entity, $itemNewName
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $itemNewName = $params->itemNewName;

        $entityName = QueryHelper::getFullEntityName($entityName);
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob Objekt existiert
        $entityToUpdate = $em->getRepository($classname)->findOneBy(
            array('id' => $id)
        );

        // Falls nein, nicht aktualisieren
        if ($entityToUpdate == null) {
            throw $this->createNotFoundException("Das zu aktualisierende Item existiert nicht");
        }

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $em->getRepository($classname)->findOneBy(
            array('name' => $itemNewName)
        );

        if (($exists == null) && is_string($itemNewName) && strlen($itemNewName) > 0) {
            // Falls ja, Objekt aktualisieren
            $entityToUpdate->setName($itemNewName);
            $em->persist($entityToUpdate);
            $em->flush();

            return new JsonResponse($entityToUpdate);
        } else {
            $response = new Response("Ein Item mit dem Namen {$itemNewName} existiert bereits", Response::HTTP_BAD_REQUEST);
            return $response;
        }

    }

}