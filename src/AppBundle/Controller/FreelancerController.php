<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 04.09.2016
 * Time: 19:49
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Freelancer\Freelancer;
use AppBundle\Entity\QueryHelper;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityNotFoundException;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
     * @Route("/freelancers/search", name="searchFreelancers")
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

        $repository = $this->getDoctrine()->getRepository('AppBundle:Freelancer\\Freelancer');
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
     * @Route("/freelancers/{freelancerId}", name="getFreelancerById")
     */
    public function getFreelancerById(Request $request, $freelancerId)
    {
        $freelancer = $this->fetchFreelancer($freelancerId);

        if($freelancer === null) {
            throw $this->createNotFoundException("Freelancer mit der Id {$freelancerId} wurde nicht gefunden!");
        }

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $freelancer,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    private function fetchFreelancer($id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:Freelancer\\Freelancer');
        $freelancer = $repository->findOneBy(
            array('id' => intval($id))
        );

        return $freelancer;
    }

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("POST")
     * @Route("/freelancers/{id}", defaults={"id"=null}, name="editFreelancer")
     */
    public function editFreelancer(Request $request, $id)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $fl = $serializer->deserialize($content, 'AppBundle\Entity\Freelancer\Freelancer', 'json', DeserializationContext::create()->setGroups(array('update')));

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($id === null) {
            $em->detach($fl);
            $fl->setCreatedAt(new \DateTime());
        }

        // Set/Add Address
        $address = $fl->getAddress();
        if ($id === null || $address->getId() === null) {
            $address->setFreelancer($fl);
            $em->persist($address);
        }

        $this->updateFreelancerPrices($fl, $em);

        $em->persist($fl);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($fl, 'json', SerializationContext::create()->setGroups(['display'])->enableMaxDepthChecks());

        return new Response($response);
    }

    private function updateFreelancerPrices(Freelancer $fl, EntityManager $em)
    {
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
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("DELETE")
     * @Route("/freelancers/{freelancerId}", name="deleteFreelancer")
     */
    public function deleteFreelancer(Request $request, $freelancerId)
    {
        $freelancer = $this->fetchFreelancer($freelancerId);

        if($freelancer === null) {
            throw $this->createNotFoundException("Freelancer mit der Id {$freelancerId} wurde nicht gefunden!");
        }

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($freelancer != null) {
            $em->remove($freelancer);
            $em->flush();
        }

        return new JsonResponse();
    }
}