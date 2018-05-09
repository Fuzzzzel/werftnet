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
    public function getSimpleEntity($entityName)
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

    /**
     * @param $entityName
     * @return object
     * @Method("GET")
     * @Route("/admin/simple_entity/{entityName}", name="fetchSimpleEntity")
     */
    public function fetchSimpleEntity($entityName)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getSimpleEntity($entityName);
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
            return null;
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
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = QueryHelper::getFullEntityName($entityName);
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $entityToRemove = $em->getRepository($classname)->findOneBy(
            array('id' => $id)
        );

        // Falls ja, nicht hinzufügen
        if ($entityToRemove == null) {
            return null;
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
        // $entity, $editedItemName
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $editedItemName = $params->itemEditedName;

        $entityName = QueryHelper::getFullEntityName($entityName);
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob Objekt existiert
        $entityToUpdate = $em->getRepository($classname)->findOneBy(
            array('id' => $id)
        );

        // Falls nein, nicht aktualisieren
        if ($entityToUpdate == null) {
            return null;
        }

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $em->getRepository($classname)->findOneBy(
            array('name' => $editedItemName)
        );

        // Falls ja, nicht hinzufügen
        if (($exists != null) && ($editedItemName != "")) {
            return null;
        }

        // Falls ja, Objekt aktualisieren
        $entityToUpdate->setName($editedItemName);
        $em->flush();

        return new JsonResponse();
    }

}