<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 10:26
 */

namespace AppBundle\Controller\Project\Order;


use AppBundle\Entity\Project\Order\Order;
use AppBundle\Entity\Project\Order\OrderPosition;
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

class OrderPositionController extends Controller
{
    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Route("/orders/{orderId}/positions/{positionId}", defaults={"positionId"=null}, name="editOrderPosition", methods={"POST"})
     */
    public function editOrderPosition(Request $request, $orderId, $positionId)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $orderPosition = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Project\Order\OrderPosition',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($orderPosition->getOrder() === null) {
            $order = $em->getRepository(Order::class)->find($orderId);
            if ($order === null) {
                return new Response('Auftrag mit der Id {$orderId} wurde nicht gefunden!', Response::HTTP_NOT_FOUND);
            } else {
                $orderPosition->setOrder($order);
            }
        } else {
            $this->checkOrderAndPositionCombination($orderId, $orderPosition);
        }

        if ($orderPosition->getId() == null || $orderPosition === null) {
            $em->detach($orderPosition);
            $orderPosition->setCreatedAt(new \DateTime());
        }

        if ($orderPosition->getPositionNumber() == null) {
            $maxPositionNumber = $em->getRepository(OrderPosition::class)->getMaxPositionNumberForOrder($orderId);
            $orderPosition->setPositionNumber(++$maxPositionNumber);
        }

        $em->persist($orderPosition);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($orderPosition, 'json', SerializationContext::create()->setGroups(['display']));

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Route("/orders/{orderId}/positions/{positionId}", name="getOrderPositionById", methods={"GET"})
     */
    public function getOrderPositionById(Request $request, $orderId, $positionId)
    {
        $em = $this->getDoctrine()->getManager();

        $position = $em->getRepository(OrderPosition::class)->find(intval($positionId));
        if ($position === null) {
            return new Response('Position mit der Id {$positionId} wurde nicht gefunden!', Response::HTTP_NOT_FOUND);
        }

        $this->checkOrderAndPositionCombination($orderId, $position);

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $position,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    /**
     * @param Request $request
     * @param $orderId
     * @return null
     * @Route("/orders/{orderId}/positions/{positionId}", name="deleteOrderPosition", methods={"DELETE"})
     */
    public function deleteOrderPosition(Request $request, $orderId, $positionId)
    {
        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $position = $em->getRepository(OrderPosition::class)->find(intval($positionId));
        if ($position === null) {
            return new Response('Position mit der Id {$positionId} wurde für Auftrag mit der Id {$orderId} nicht gefunden!', Response::HTTP_NOT_FOUND);
        }

        $this->checkOrderAndPositionCombination($orderId, $position);

        $em->remove($position);
        $em->flush();

        return new JsonResponse();
    }

    private function checkOrderAndPositionCombination($orderId, $orderPosition)
    {
        if (intval($orderId) !== $orderPosition->getOrder()->getId()) {
            throw new BadRequestHttpException('Auftragsposition gehört nicht zum angegebenen Auftrag!');
        }
    }
}