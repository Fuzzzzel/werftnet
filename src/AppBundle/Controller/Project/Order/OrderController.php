<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 10:26
 */

namespace AppBundle\Controller\Project\Order;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Entity\QueryHelper;
use Doctrine\ORM\EntityNotFoundException;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class OrderController extends Controller
{
    /**
     * @return Response
     *
     * @Method("POST")
     * @Route("/orders/search", name="searchOrders")
     */
    public function searchOrders(Request $request)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }

        if (!isset($params['page']))
            $params['page'] = 1;

        $repository = $this->getDoctrine()->getRepository('AppBundle:Project\Order\Order');
        $orderPaginatedResult = $repository->findAllBySearchParams($params, 20, $params['page']);

        $orderSerializableResult = QueryHelper::getSerializableResult($orderPaginatedResult);

        $response = json_encode($orderSerializableResult);

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("POST")
     * @Route("/orders/{orderId}", defaults={"orderId"=null}, name="editOrder")
     */
    public function editOrder(Request $request, $orderId)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $order = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Project\Order\Order',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($order->getId() == null || $orderId === null) {
            $em->detach($order);
            $order->setCreatedAt(new \DateTime());
        }

        $em->persist($order);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($order, 'json', SerializationContext::create()->setGroups(['display']));

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("GET")
     * @Route("/orders/{orderId}", name="getOrderById")
     */
    public function getOrderById(Request $request, $orderId)
    {
        if (!isset($orderId) || !(intval($orderId) > 0)) {
            return new Response('Order mit der id {$id} wurde nicht gefunden!', Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Project\Order\Order');
        $order = $repository->find(intval($orderId));

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $order,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    /**
     * @param Request $request
     * @param $orderId
     * @return null
     * @Method("DELETE")
     * @Route("/orders/{orderId}", name="deleteOrder")
     */
    public function deleteOrder(Request $request, $orderId)
    {

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $order = $em->find('AppBundle\Entity\Project\Order\Order', intval($orderId));

        if ($order != null) {
            $em->remove($order);
            $em->flush();
        }

        return new JsonResponse();
    }

    // ------ ORDER POSITIONS ------

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("GET")
     * @Route("/orders/{orderId}/positions/{orderPositionId}", name="getOrderPositionById")
     */
    public function getOrderPositionById(Request $request, $orderId, $orderPositionId)
    {
        if (!isset($orderId) || (!intval($orderId) > 0)) {
            return new Response("Ungültige Order Id: {$orderId}", Response::HTTP_BAD_REQUEST);
        }

        if (!isset($orderPositionId) || (!intval($orderPositionId) > 0)) {
            return new Response("Ungültige Position Id: {$orderPositionId}", Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Project\Order\OrderPosition');
        $orderPosition = $repository->find(intval($orderPositionId));

        if ($orderPosition->getOrder()->getId() !== intval($orderId)) {
            throw new BadRequestHttpException("Position mit der Id {$orderPositionId} gehört nicht zum Auftrag mit der Id {$orderId}!");
        }

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $orderPosition,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }


    /**
     * Fügt Kontakt hinzu oder bearbeitet ihn
     *
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("POST")
     * @Route("/orders/{orderId}/positions/{orderPositionId}", defaults={"orderPositionId"=null}, name="editOrderPosition")
     */
    public function editOrderPosition(Request $request, $orderId, $orderPositionId)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        // Request-Parameter decodieren
        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }


        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $serializer = $this->get('jms_serializer');
        $position = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Project\Order\OrderPosition',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // Erstellungsdatum setzen
        if ($position->getId() == null) {
            $em->detach($position);
            $position->setCreatedAt(new \DateTime());
        }

        // Neue Position zu Auftrag hinzufügen
        $order = $em->find('AppBundle\Entity\Project\Order\Order', $orderId);
        $order->addPosition($position);

        // Daten speichern
        if ($position->getOrder() != null) {
            $em->persist($position);
            $em->flush();
        }

        // Liefern der Suche als Ergebnis (JSON)
        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $position,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );

        return new Response($response);
    }


    /**
     * Löscht den Kontakt mit der übergebenen ID
     *
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("DELETE")
     * @Route("/orders/{orderId}/positions/{orderPositionId}", name="deletePosition")
     */
    public function deletePosition(Request $request, $orderId, $orderPositionId)
    {
        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $position = $em->find('AppBundle\Entity\Project\Order\OrderPosition', $orderPositionId);

        if ($position == null) {
            throw $this->createNotFoundException("Position mit der Id {$orderPositionId} wurde nicht gefunden!");
        } else {
            if ($position->getOrder()->getId() !== intval($orderId)) {
                throw new BadRequestHttpException('Position mit der Id {$orderPositionId} gehört nicht zum Kunden mit der Id {$orderId}!');
            }
        }

        $em->remove($position);
        $em->flush();

        return new JsonResponse();
    }
}