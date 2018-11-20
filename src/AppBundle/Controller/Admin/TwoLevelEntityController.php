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
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
     * @return \stdClass
     *
     * !! Duplicated in DefaultsController --> Move to service?!
     */
    public function getTwoLevelEntityById($entityName, $id)
    {
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $itemFromDb = $this->getDoctrine()
            ->getRepository($classname)
            ->findOneBy(
                array('id' => $id)
            );

        $mainItem = null;

        if ($itemFromDb != null) {
            $mainItem = new \stdClass;
            $mainItem->id = $itemFromDb->getId();
            $mainItem->name = $itemFromDb->getName();

            $subItems = $this->getDoctrine()
                ->getRepository($classname)
                ->findAllSubItems($id);

            // Subsprachen den Hauptsprachen zuordnen
            foreach ($subItems as $subItem) {
                $itemObj = new \stdClass();
                $itemObj->id = $subItem->getId();
                $itemObj->name = $subItem->getName();

                $mainItem->sub_items[] = $itemObj;
            }
        }


        return $mainItem;
    }

    /**
     * @param $entityName
     * @return object
     * @Route("/admin/two_level_entity/{entityName}", name="fetchTwoLevelEntity", methods={"GET"})
     */
    public function fetchTwoLevelEntity($entityName)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getTwoLevelEntity($entityName);
        return new JsonResponse($result);
    }

    /**
     * @param $entityName
     * @return object
     * @Route("/admin/two_level_entity/{entityName}/{id}", name="fetchTwoLevelEntityById", methods={"GET"})
     */
    public function fetchTwoLevelEntityById($entityName, $id)
    {
        $entityName = QueryHelper::getFullEntityName($entityName);
        $result = $this->getTwoLevelEntityById($entityName, $id);
        if ($result == null) {
            throw $this->createNotFoundException("Entity {$entityName} mit der Id {$id} konnte nicht gefunden werden");
        }
        return new JsonResponse($result);
    }

    /**
     * @param $entityName
     * @return object
     * @Route("/admin/two_level_entity/{entityName}", name="createTwoLevelEntityMainItem", methods={"POST"})
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
     * @return Response
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items", name="createTwoLevelEntityItem", methods={"POST"})
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

        $classname = "AppBundle\\Entity\\" . $entityName;

        $newItem = new $classname();
        $newItem->setName($newItemName);

        $em = $this->getDoctrine()->getManager();

        $repo = $em->getRepository("AppBundle\\Entity\\" . $entityName);

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $exists = $this->checkNewName($classname, $newItemName, $mainItemId);

        // Falls ja, nicht hinzufügen
        if ($exists  || ($newItemName === "")) {
            $response = new Response("Die Bezeichnung existiert schon oder die Bezeichnung ist leer!", Response::HTTP_BAD_REQUEST);
            return $response;
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
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items/{subItemId}", name="deleteTwoLevelEntitySubItem", methods={"DELETE"})
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
     * @Route("/admin/two_level_entity/{entityName}/{removeItemId}", name="deleteTwoLevelEntityItem", methods={"DELETE"})
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

        // Falls nicht gefunden oder Hauptitem mit Subitems abbrechen
        if ($entityToRemove == null) {
            throw $this->createNotFoundException("Item zum löschen wurde nicht gefunden");
        }

        $subItems = $repo->findAllSubItems($removeItemId);
        if (empty($subItems)) {
            // Falls keine SubItems vorhanden, entfernen
            $em->remove($entityToRemove);
            $em->flush();
        } else {
            return new JsonResponse("Item hat noch Subitems und kann nicht gelöscht werden", Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse();
    }

    /**
     * Name des Items ändern
     *
     * @param Request $request
     * @return JsonResponse
     * @Route("/admin/two_level_entity/{entityName}/{mainItemId}/sub_items/{subItemId}", name="updateTwoLevelEntitySubItem", methods={"POST"})
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
     * @Route("/admin/two_level_entity/{entityName}/{itemId}", name="updateTwoLevelEntityItem", methods={"POST"})
     */
    function updateTwoLevelEntityItem($entityName, $itemId, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = QueryHelper::getFullEntityName($entityName);
        $itemNewName = $params->itemNewName;

        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();

        // Prüfen ob Objekt existiert
        $entityToUpdate = $em->getRepository($classname)->findOneBy(
            array('id' => $itemId)
        );

        // Falls nein, nicht aktualisieren
        if ($entityToUpdate == null) {
            throw $this->createNotFoundException("Das zu aktualisierende Item wurde nicht gefunden");
        }

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $mainItem = $entityToUpdate->getMainItem();
        $exists = $this->checkNewName($classname, $itemNewName, $mainItem->getId());

        // Falls ja, nicht hinzufügen
        if ($exists|| ($itemNewName == "")) {
            return new JsonResponse("Die Bezeichnung existiert schon oder die Bezeichnung ist leer!", Response::HTTP_BAD_REQUEST);
        } else {
            $entityToUpdate->setName($itemNewName);
            $em->persist($entityToUpdate);
            $em->flush();

            return new JsonResponse();
        }
    }


    /**
     * Item zu Hauptitem machen
     *
     * @param Request $request
     * @return JsonResponse
     * @Route("admin/makeMainItem", name="makeMainItem", methods={"POST"})
     */
    function makeMainItem(Request $request)
    {
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
            throw $this->createNotFoundException("Das zu aktualisierende SubItem wurde nicht gefunden");
        }

        $exists = $this->checkNewName($classname, $item->getName(), null);

        if ($exists) {
            return new JsonResponse("Die Bezeichnung existiert schon!", Response::HTTP_BAD_REQUEST);
        }

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
     * @Route("admin/addAsSubItem", name="addAsSubItem", methods={"POST"})
     */
    function addAsSubItem(Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content);
        }

        $entityName = $params->entityName;
        $entityName = QueryHelper::getFullEntityName($entityName);
        $itemId = $params->itemId;
        $mainItemId = $params->mainItemId;

        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository($classname);

        // Prüfen ob Objekt existiert
        $item = $repo->findOneBy(
            array('id' => $itemId)
        );

        $itemMain = $repo->findOneBy(
            array('id' => $mainItemId)
        );

        // Falls Item nicht existiert, nicht aktualisieren
        if ($item == null || $itemMain == null) {
            throw $this->createNotFoundException("Das zu aktualisierende Item wurde nicht gefunden");
        }

        if (!$itemMain->isMainItem()) {
            return new JsonResponse("Item kann keinem anderen Subitem zugeordnet werden!", Response::HTTP_BAD_REQUEST);
        }

        // Item darf nicht SubItem von sich selbst sein
        if ($item == $itemMain) {
            return new JsonResponse("Item kann nicht SubItem von sich selbst sein!", Response::HTTP_BAD_REQUEST);
        }

        $exists = $this->checkNewName($classname, $item->getName(), $itemMain->getId());

        if ($exists) {
            return new JsonResponse("Die Bezeichnung existiert schon!", Response::HTTP_BAD_REQUEST);
        }

        $subItems = $repo->findAllSubItems($itemId);

        if (empty($subItems)) {
            // Falls ja, Objekt aktualisieren
            $item->setMainItem($itemMain);
            $em->flush();
        }

        return new JsonResponse();
    }

    private function checkNewName($classname, $newName, $mainItemId) {
        $em = $this->getDoctrine()->getManager();

        // Prüfen ob bereits ein Objekt mit diesem Namen existiert
        $repo = $em->getRepository($classname);

        $searchArray = array('name' => $newName, 'mainItem' => null);
        if ($mainItemId !== null) {
            $itemMain = $repo->findOneBy(
                array('id' => $mainItemId));
            $searchArray['mainItem'] = $itemMain;
        }
        $exists = $repo->findOneBy(
            $searchArray
        );

        return $exists !== null;
    }
}