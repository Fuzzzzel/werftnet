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
use AppBundle\Entity\Project\Order\OrderTask;
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

class OrderTaskController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     * @throws EntityNotFoundException
     *
     * @Route("/orders/{orderId}/positions/{positionId}/tasks/{taskId}", defaults={"taskId"=null}, name="editOrderTask", methods={"POST"})
     */
    public function editOrderTask(Request $request, $orderId, $positionId, $taskId)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $orderTask = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Project\Order\OrderTask',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($orderTask->getPosition() === null) {
            $position = $em->getRepository(OrderPosition::class)->findOneBy(
                array('id' => $positionId)
            );
            if ($position === null) {
                return new Response("Auftragsposition mit der Id {$positionId} wurde nicht gefunden!", Response::HTTP_NOT_FOUND);
            } else {
                $orderTask->setPosition($position);
            }
        }

        $this->checkOrderPositionTaskCombination($orderId, $positionId, $orderTask);

        if ($orderTask->getId() == null || $orderTask === null) {
            $em->detach($orderTask);
            $orderTask->setCreatedAt(new \DateTime());
        }

        if ($orderTask->getTaskNumber() == null) {
            $maxTaskNumber = $em->getRepository(OrderTask::class)->getMaxTaskNumberForPosition($positionId);
            $orderTask->setTaskNumber(++$maxTaskNumber);
        }

        $em->persist($orderTask);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($orderTask, 'json', SerializationContext::create()->setGroups(['display']));

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return Response
     * @throws EntityNotFoundException
     *
     * @Route("/orders/{orderId}/positions/{positionId}/tasks/{taskId}", name="getOrderTaskById", methods={"GET"})
     */
    public function getOrderTaskById(Request $request, $orderId, $positionId, $taskId)
    {
        $em = $this->getDoctrine()->getManager();

        $task = $em->getRepository(OrderTask::class)->find(intval($taskId));
        if ($task === null) {
            return new Response('Aufgabe mit der Id {$taskId} wurde nicht gefunden!', Response::HTTP_NOT_FOUND);
        }

        $this->checkOrderPositionTaskCombination($orderId, $positionId, $task);

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $task,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    /**
     * @param Request $request
     * @param $orderId
     * @return Response
     * @Route("/orders/{orderId}/positions/{positionId}/tasks/{taskId}", name="deleteOrderTask", methods={"DELETE"})
     */
    public function deleteOrderTask(Request $request, $orderId, $positionId, $taskId)
    {
        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $task = $em->getRepository(OrderTask::class)->find(intval($taskId));
        if ($task === null) {
            return new Response('Position mit der Id {$positionId} wurde für Auftrag mit der Id {$orderId} nicht gefunden!', Response::HTTP_NOT_FOUND);
        }

        $this->checkOrderPositionTaskCombination($orderId, $positionId, $task);

        $em->remove($task);
        $em->flush();

        return new JsonResponse();
    }

    private function checkOrderPositionTaskCombination($orderId, $positionId, OrderTask $orderTask)
    {
        $position = $orderTask->getPosition();
        if ($orderTask->getPosition() === null || intval($positionId) !== $orderTask->getPosition()->getId()) {
            throw new BadRequestHttpException('Aufgabe gehört nicht zur angegebenen Position!');
        }

        if (intval($orderId) !== $position->getOrder()->getId()) {
            throw new BadRequestHttpException('Auftragsposition gehört nicht zum angegebenen Auftrag!');
        }
    }
}