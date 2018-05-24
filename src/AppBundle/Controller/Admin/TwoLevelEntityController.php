<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 06.08.2017
 * Time: 23:20
 */

namespace AppBundle\Controller\Admin;

use AppBundle\Entity\QueryHelper;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

class TwoLevelEntityController extends Controller
{
    /**
     * @param $entityName
     * @return \stdClass
     *
     * !! Duplicated in DefaultsController --> Move to service?!
     */
    public function getTwoLevelEntity($entityName)
    {
        $items = new \stdClass;
        $itemsTemp = array();
        $classname = "AppBundle\\Entity\\" . $entityName;

        $repo = $this->getDoctrine()
            ->getRepository($classname);
        $itemsFromDb = $repo->findAllItems();

        // Subsprachen den Hauptsprachen zuordnen
        foreach ($itemsFromDb as $lang) {
            $itemObj = new \stdClass();
            $itemObj->id = $lang->getId();
            $itemObj->name = $lang->getName();

            if ($lang->isMainItem()) {
                // Add main language to result array
                $itemsTemp[$lang->getId()] = $itemObj;
            } else {
                // Add sub language to main
                $itemsTemp[$lang->getMainItem()->getId()]->sub_items[] = $itemObj;
            }
        }

        $dummyItem = new $classname();
        $items->display_name = $dummyItem->getDisplayName();
        foreach ($itemsTemp as $completeItem) {
            $items->values[] = $completeItem;
        }

        return $items;
    }

    /**
     * @param $entityName
     * @return object
     * @Method("GET")
     * @Route("/admin/two_level_entity/{entityName}", name="fetchTwoLevelEntity")
     */
    public function fetchTwoLevelEntityEntity($entityName)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getTwoLevelEntity($entityName);
        return new JsonResponse($result);
    }

    /**
     * @param $entityName
     * @return object
     * @Method("POST")
     * @Route("/admin/two_level_entity/{entityName}", name="createTwoLevelEntityMainItem")
     */
    public function createTwoLevelEntityMainItem($entityName, Request $request)
    {
        return $this->createTwoLevelEntityItem($entityName, null, $request);
    }

    /**
     * Neues Item hinzufügen. Falls neues Subitem, wird die Id des
     * zugehörigen Hauptitems übergeben.
     *
     * @param String $newItemName Name des neuen Items
     * @return JsonResponse
     * @Method("POST")
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items", name="createTwoLevelEntityItem")
     */
    public function createTwoLevelEntityItem($entityName, $mainItemId = null, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = QueryHelper::getFullEntityName($entityName);
        $newItemName = $params->newItemName;

        $fullEntityName = "AppBundle\\Entity\\" . $entityName;

        $newItem = new $fullEntityName();
        $newItem->setName($newItemName);

        $em = $this->getDoctrine()->getManager();

        $repo = $em->getRepository("AppBundle\\Entity\\" . $entityName);

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $repo->findOneBy(
            array('name' => $newItemName)
        );

        // Falls ja, nicht hinzufügen
        if (($exists !== null) && ($newItemName != "")) {
            // ToDo: Fehlermeldung zurückgeben
            return new JsonResponse("Die Bezeichnung existiert schon oder die Bezeichnung ist leer!");
        }

        // Falls neues Subitem
        // Hauptitem zum neuen Subitem suchen
        if ($mainItemId != null) {
            $itemMain = $repo->findOneBy(
                array('id' => $mainItemId));
        } else {
            $itemMain = null;
        }

        if ($itemMain !== null) {
            $newItem->setMainItem($itemMain);
        }

        $em->persist($newItem);
        $em->flush();

        return new JsonResponse($newItem);
    }


    /**
     * Item wird gelöscht, wenn es sich um ein Subitem handelt oder
     * wenn es sich um ein Hauptitem ohne Subitems handelt
     *
     * @param Request $request
     * @return JsonResponse
     * @Method("DELETE")
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items/{subItemId}", name="deleteTwoLevelEntitySubItem")
     */
    function deleteTwoLevelEntitySubItem($entityName, $mainItemId, $subItemId, Request $request)
    {
        return $this->deleteTwoLevelEntityItem($entityName, $subItemId, $request);
    }

    /**
     * Item wird gelöscht, wenn es sich um ein Subitem handelt oder
     * wenn es sich um ein Hauptitem ohne Subitems handelt
     *
     * @param Request $request
     * @return JsonResponse
     * @Method("DELETE")
     * @Route("/admin/two_level_entity/{entityName}/{removeItemId}", name="deleteTwoLevelEntityItem")
     */
    function deleteTwoLevelEntityItem($entityName, $removeItemId, Request $request)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $repo = $em->getRepository("AppBundle\\Entity\\" . $entityName);
        $entityToRemove = $repo->findOneBy(
            array('id' => $removeItemId)
        );

        // Falls nicht gefunden oder Hauptsprache mit Subsprachen abbrechen
        if ($entityToRemove == null) {
            // ToDo: Fehlermeldung zurückgeben
            return new JsonResponse();
        }

        $subItems = $repo->findAllSubItems($removeItemId);
        if (empty($subItems)) {
            // Falls keine SubItems vorhanden, entfernen
            $em->remove($entityToRemove);
            $em->flush();
        } else {
            // ToDo: Fehlermeldung zurückgeben
            return new JsonResponse();
        }

        return new JsonResponse();
    }

    /**
     * Name des Items ändern
     *
     * @param Request $request
     * @return JsonResponse
     * @Method("POST")
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items/{subItemId}", name="updateTwoLevelEntitySubItem")
     */
    function updateTwoLevelEntitySubItem($entityName, $mainItemId, $subItemId, Request $request)
    {
        return $this->updateTwoLevelEntityItem($entityName, $subItemId, $request);
    }

    /**
     * Name des Items ändern
     *
     * @param Request $request
     * @return JsonResponse
     * @Method("POST")
     * @Route("/admin/two_level_entity/{entityName}/{itemId}", name="updateTwoLevelEntityItem")
     */
    function updateTwoLevelEntityItem($entityName, $itemId, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = QueryHelper::getFullEntityName($entityName);
        $editedEntityName = $params->itemNewName;

        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob Objekt existiert
        $entityToUpdate = $em->getRepository($classname)->findOneBy(
            array('id' => $itemId)
        );

        // Falls nein, nicht aktualisieren
        if ($entityToUpdate == null) {
            return null;
        }

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $em->getRepository($classname)->findOneBy(
            array('name' => $editedEntityName)
        );

        // Falls ja, nicht hinzufügen
        if (($exists != null) && ($editedEntityName != "")) {
            return null;
        }

        // Falls ja, Objekt aktualisieren
        $entityToUpdate->setName($editedEntityName);
        $em->flush();

        return new JsonResponse();
    }


    /**
     * Item zu Hauptitem machen
     *
     * @param Request $request
     * @return JsonResponse
     * @Route("admin/makeMainItem", name="makeMainItem")
     */
    function makeMainItem(Request $request)
    {
        // $entity, $editedItemName
        if ($request->getMethod() != 'POST') {
            return null;
        }

        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = $params->entityName;
        $entityName = QueryHelper::getFullEntityName($entityName);
        $itemId = $params->itemId;


        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository($classname);

        // Prüfen ob Objekt existiert
        $item = $repo->findOneBy(
            array('id' => $itemId)
        );

        // Falls nein, Fehlermeldung ausgeben
        if ($item == null) {
            // ToDo: Fehlermeldung, wenn zu löschende Sprache nicht gefunden
            return new JsonResponse();
        }

        // Falls ja, Objekt aktualisieren
        $item->setMainItem(null);
        $em->flush();

        return new JsonResponse();
    }

    /**
     * Sprache zur Subsprache machen, falls es sich nicht um eine
     * Hauptsprache handelt, die bereits eigene Subsprachen hat.
     *
     * @param Request $request
     * @return JsonResponse
     * @Route("admin/addAsSubItem", name="addAsSubItem")
     */
    function addAsSubItem(Request $request)
    {
        // $entity, $editedItemName
        if ($request->getMethod() != 'POST') {
            return null;
        }

        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = $params->entityName;
        $entityName = QueryHelper::getFullEntityName($entityName);
        $itemId = $params->itemId;
        $itemMainId = $params->itemMainId;

        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository($classname);

        // Prüfen ob Objekt existiert
        $item = $repo->findOneBy(
            array('id' => $itemId)
        );

        $itemMain = $repo->findOneBy(
            array('id' => $itemMainId)
        );

        // Falls Sprache nicht existiert, nicht aktualisieren
        if ($item == null || $itemMain == null) {
            // ToDo: Fehlermeldung, dass Sprache nicht gefunden
            return new JsonResponse();
        }

        // Falls Sprache nicht existiert, nicht aktualisieren
        if ($item == $itemMain) {
            // ToDo: Fehlermeldung, dass Sprache nicht Subsprache von sich selbst sein darf.
            return new JsonResponse();
        }

        $subItems = $repo->findAllSubItems($itemId);

        if (empty($subItems)) {
            // Falls ja, Objekt aktualisieren
            $item->setMainItem($itemMain);
            $em->flush();
        }

        return new JsonResponse();
    }
}