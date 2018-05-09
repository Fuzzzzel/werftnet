<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 04.09.2016
 * Time: 19:49
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Freelancer;
use AppBundle\Entity\QueryHelper;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Mapping\ClassMetadata;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class FreelancerController
 * @package AppBundle\Controller
 *
 */
class FreelancerController extends Controller
{

    /**
     * @return Response
     *
     * @Method("POST")
     * @Route("/freelancer/searchFreelancers", name="searchFreelancers")
     */
    public function searchFreelancers(Request $request)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }

        if (!isset($params['page']))
            $params['page'] = 1;

        $repository = $this->getDoctrine()->getRepository('AppBundle:Freelancer');
        $flPaginatedResult = $repository->findAllBySearchParams($params, 20, $params['page']);

        $flSerializableResult = QueryHelper::getSerializableResult($flPaginatedResult);

        $response = json_encode($flSerializableResult);

        return new Response($response);
    }

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("GET")
     * @Route("/freelancer/{freelancerId}", name="getFreelancerById")
     */
    public function getFreelancerById(Request $request, $freelancerId)
    {
        if (!isset($freelancerId) && !(intval($freelancerId) > 0)) {
            throw new NotFoundHttpException('Freelancer mit der id {$id} wurde nicht gefunden!');
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Freelancer');
        $freelancer = $repository->find(intval($freelancerId));

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $freelancer,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("POST")
     * @Route("/freelancer/editFreelancer", name="editFreelancer")
     */
    public function editFreelancer(Request $request)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $fl = $serializer->deserialize($content, 'AppBundle\Entity\Freelancer', 'json', DeserializationContext::create()->setGroups(array('update')));

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($fl->getId() == null) {
            $fl->setCreatedAt(new \DateTime());
        }

        // --------------------------------------
        // Test für den Persist-Listener eines Freelancers
        // --------------------------------------
        $address = $fl->getAddress();
        if ($address->getId() == null) {
            $address->setFreelancer($fl);
            $em->persist($address);
        }

        // Neue Preise hinzufügen
        foreach ($fl->getPrices() as $price) {
            if ($price->getId() == null) {
                $price->setFreelancer($fl);
                $em->persist($price);
            }
        }

        // Entfernte Preise löschen
        if ($fl->getId() != null) {
            $items_old = $this->getDoctrine()->getRepository('\AppBundle\Entity\Freelancer\FreelancerPrice')->findBy(
                array('freelancer' => $fl),
                array()
            );
            foreach ($items_old as $item_old) {
                $item_exists = false;
                foreach ($fl->getPrices() as $item_new) {
                    $item_exists = ($item_old->getId() == $item_new->getId());
                    if ($item_exists) {
                        break;
                    }
                }
                if (!$item_exists) {
                    $em->remove($item_old);
                }
            }
        }


        // Test Ende!

        $em->persist($fl);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($fl, 'json', SerializationContext::create()->setGroups(['display'])->enableMaxDepthChecks());

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Route("/freelancer/deleteFreelancer", name="deleteFreelancer")
     */
    public function deleteFreelancer(Request $request)
    {
        // $entity, $name
        if ($request->getMethod() != 'POST') {
            return null;
        }

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();


        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($content != null) {
            $fl = $em->find('AppBundle\Entity\Freelancer', $content);

            if ($fl != null) {
                $em->remove($fl);
                $em->flush();
            }
        }

        return new JsonResponse();
    }
}