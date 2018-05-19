<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 04.09.2016
 * Time: 19:49
 */

namespace AppBundle\Controller;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityNotFoundException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializerBuilder;
use AppBundle\Entity\Customer;
use AppBundle\Entity\QueryHelper;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class CustomerController
 * @package AppBundle\Controller
 *
 */
class CustomerController extends Controller
{

    /**
     * @return Response
     *
     * @Method("POST")
     * @Route("/customers/search", name="searchCustomers")
     */
    public function searchCustomers(Request $request)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }

        if (!isset($params['page']))
            $params['page'] = 1;

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer');
        $custPaginatedResult = $repository->findAllBySearchParams($params, 20, $params['page']);

        $custSerializableResult = QueryHelper::getSerializableResult($custPaginatedResult);

        $response = json_encode($custSerializableResult);

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("POST")
     * @Route("/customers/{customerId}", defaults={"customerId"=null}, name="editCustomer")
     */
    public function editCustomer(Request $request, $customerId)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $cust = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Customer',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($cust->getId() == null || $customerId === null) {
            $em->detach($cust);
            $cust->setCreatedAt(new \DateTime());
        }
        $cust->setId($customerId);


        // --------------------------------------------
        // Test für den Persist-Listener eines Kunden
        // --------------------------------------------
        $address = $cust->getAddress();
        if ($address->getId() == null) {
            $address->setCustomer($cust);
            $em->persist($address);
        }

        $em->persist($cust);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($cust, 'json', SerializationContext::create()->setGroups(['display']));

        return new Response($response);
    }


    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("GET")
     * @Route("/customers/{customerId}", name="getCustomerById")
     */
    public function getCustomerById(Request $request, $customerId)
    {
        if (!isset($customerId) && !(intval($customerId) > 0)) {
            throw new NotFoundHttpException('Customer mit der id {$id} wurde nicht gefunden!');
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer');
        $customer = $repository->find(intval($customerId));

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $customer,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );
        return new Response($response);
    }

    /**
     * @param Request $request
     * @param $customerId
     * @return null
     * @Method("DELETE")
     * @Route("/customers/{customerId}", name="deleteCustomer")
     */
    public function deleteCustomer(Request $request, $customerId)
    {

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $cu = $em->find('AppBundle\Entity\Customer', intval($customerId));

        if ($cu != null) {
            $em->remove($cu);
            $em->flush();
        }

        return new JsonResponse();
    }

    // ------ CUSTOMER CONTACT ------

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("GET")
     * @Route("/customers/{customerId}/contacts/{customerContactId}", name="getCustomerContactById")
     */
    public function getCustomerContactById(Request $request, $customerId, $customerContactId)
    {
        if (!isset($customerContactId) && !(intval($customerContactId) > 0)) {
            throw new NotFoundHttpException('Customer contact mit der id {$customerContactId} wurde nicht gefunden!');
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer\CustomerContact');
        $customerContact = $repository->find(intval($customerContactId));

        if ($customerContact->getCustomer()->getId() != $customerId) {
            throw new BadRequestHttpException('Contact mit der Id {$customerContactId} gehört nicht zum Kunden mit der Id {$customerId}!');
        }

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $customerContact,
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
     * @Route("/customers/{customerId}/contacts/{customerContactId}", defaults={"customerContactId"=null}, name="editCustomerContact")
     */
    public function editCustomerContact(Request $request, $customerId, $customerContactId)
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
        $contact = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Customer\CustomerContact',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // Erstellungsdatum setzen
        if ($contact->getId() == null) {
            $em->detach($contact);
            $contact->setCreatedAt(new \DateTime());
        }
        $contact->setId($customerContactId);

        // Neuen Kontakt zu Kunde hinzufügen
        $customer = $em->find('AppBundle\Entity\Customer', $customerId);
        $customer->addContact($contact);

        // Daten speichern
        if ($contact->getCustomer() != null) {
            $em->persist($contact);
            $em->flush();
        }

        // Liefern der Suche als Ergebnis (JSON)
        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $contact,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );

        return new Response($response);


        // Falls man bis hierher kommt, hat etwas nicht geklappt
        // return new Response("Fehler beim Speichern des Kontakts!", 500);
    }


    /**
     * Löscht den Kontakt mit der übergebenen ID
     *
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Method("DELETE")
     * @Route("/customers/{customerId}/contacts/{customerContactId}", name="deleteContact")
     */
    public function deleteContact(Request $request, $customerId, $customerContactId)
    {

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $contact = $em->find('AppBundle\Entity\Customer\CustomerContact', $customerContactId);

        if ($contact != null) {
            if ($contact->getCustomer()->getId() !== $customerId) {
                throw new BadRequestHttpException('Contact mit der Id {$customerContactId} gehört nicht zum Kunden mit der Id {$customerId}!');
            }
            $em->remove($contact);
            $em->flush();

            return new JsonResponse();
        }


        // Wenn die Funktion bis hierher kommt, gab es einen Fehler
        return new Response("Fehler beim Löschen des Ansprechpartners", 500);
    }
}