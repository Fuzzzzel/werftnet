<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 10:26
 */

namespace AppBundle\Controller\Project\Order;


use AppBundle\Entity\Project\Order\Order;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
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
     * @Route("/orders/search", name="searchOrders", methods={"POST"})
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
     * @Route("/orders/{orderId}", defaults={"orderId"=null}, name="editOrder", methods={"POST"})
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
            $order->setYear($order->getYear());
        }

        if ($order->getNumberInYear() == null) {
            $maxNumberInYear = $em->getRepository(Order::class)->getMaxNumberInYear();
            $order->setNumberInYear(++$maxNumberInYear);
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
     * @Route("/orders/{orderId}", name="getOrderById", methods={"GET"})
     */
    public function getOrderById(Request $request, $orderId)
    {
        if (!isset($orderId) || !(intval($orderId) > 0)) {
            return new Response('{$orderId} ist keine gültige Auftrags Id!!', Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository(Order::class);
        $order = $repository->find(intval($orderId));

        if($order === null) {
            return new Response('Auftrag mit der Id {$orderId} wurde nicht gefunden!', Response::HTTP_NOT_FOUND);
        }

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
     * @Route("/orders/{orderId}", name="deleteOrder", methods={"DELETE"})
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
}