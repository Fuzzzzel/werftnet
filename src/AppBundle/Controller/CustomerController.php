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
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializerBuilder;
use AppBundle\Entity\Customer\Customer;
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
     * @Route("/customers/search", name="searchCustomers", methods={"POST"})
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

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer\Customer');
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
     * @Route("/customers/{customerId}", defaults={"customerId"=null}, name="editCustomer", methods={"POST"})
     */
    public function editCustomer(Request $request, $customerId)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $cust = $serializer->deserialize(
            $content,
            'AppBundle\Entity\Customer\Customer',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        if ($cust->getId() == null || $customerId === null) {
            $em->detach($cust);
            $cust->setCreatedAt(new \DateTime());
        }

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
     * @return Response
     *
     * @Route("/customers/dropdownvalues", name="fetchCustomerDropdownValues", methods={"GET"})
     */
    public function fetchCustomerDropdownValues(Request $request)
    {
        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $repository = $this->getDoctrine()->getRepository(Customer::class);
        $customersForDropdown = $repository->findBy(
            array(),
            array('name1' => 'ASC')
        );

        $serializer = SerializerBuilder::create()->build();
        $customerDropdownValues = $serializer->serialize(
            $customersForDropdown,
            'json',
            SerializationContext::create()->setGroups(['dropdown'])
        );

        return new Response($customerDropdownValues);
    }

    /**
     * @param Request $request
     * @return null
     * @throws EntityNotFoundException
     *
     * @Route("/customers/{customerId}", name="getCustomerById", methods={"GET"})
     */
    public function getCustomerById(Request $request, $customerId)
    {
        if (!isset($customerId) || !(intval($customerId) > 0)) {
            return new Response('Customer mit der id {$id} wurde nicht gefunden!', Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer\Customer');
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
     * @Route("/customers/{customerId}", name="deleteCustomer", methods={"DELETE"})
     */
    public function deleteCustomer(Request $request, $customerId)
    {

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $cu = $em->find('AppBundle\Entity\Customer\Customer', intval($customerId));

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
     *
     * @Route("/customers/{customerId}/contacts", name="getCustomerContacts", methods={"GET"})
     */
    public function getCustomerContacts(Request $request, $customerId)
    {
        if (!isset($customerId) || (!intval($customerId) > 0)) {
            return new Response("Ungültige Customer Id: {$customerId}", Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer\CustomerContact');
        $customerContacts = $repository->findAllByCustomerId(intval($customerId));

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $customerContacts,
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
     * @Route("/customers/{customerId}/contacts/{customerContactId}", name="getCustomerContactById", methods={"GET"})
     */
    public function getCustomerContactById(Request $request, $customerId, $customerContactId)
    {
        if (!isset($customerId) || (!intval($customerId) > 0)) {
            return new Response("Ungültige Customer Id: {$customerId}", Response::HTTP_BAD_REQUEST);
        }

        if (!isset($customerContactId) || (!intval($customerContactId) > 0)) {
            return new Response("Ungültige Contact Id: {$customerContactId}", Response::HTTP_BAD_REQUEST);
        }

        $repository = $this->getDoctrine()->getRepository('AppBundle:Customer\CustomerContact');
        $customerContact = $repository->find(intval($customerContactId));

        if ($customerContact->getCustomer()->getId() !== intval($customerId)) {
            throw new BadRequestHttpException("Contact mit der Id {$customerContactId} gehört nicht zum Kunden mit der Id {$customerId}!");
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
     * @Route("/customers/{customerId}/contacts/{customerContactId}", defaults={"customerContactId"=null}, name="editCustomerContact", methods={"POST"})
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

        // Neuen Kontakt zu Kunde hinzufügen
        $customer = $em->find('AppBundle\Entity\Customer\Customer', $customerId);
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
     * @Route("/customers/{customerId}/contacts/{customerContactId}", name="deleteContact", methods={"DELETE"})
     */
    public function deleteContact(Request $request, $customerId, $customerContactId)
    {
        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $contact = $em->find('AppBundle\Entity\Customer\CustomerContact', $customerContactId);

        if ($contact == null) {
            throw $this->createNotFoundException("Contact mit der Id {$customerContactId} wurde nicht gefunden!");
        } else {
            if ($contact->getCustomer()->getId() !== intval($customerId)) {
                throw new BadRequestHttpException('Contact mit der Id {$customerContactId} gehört nicht zum Kunden mit der Id {$customerId}!');
            }
        }

        $em->remove($contact);
        $em->flush();

        return new JsonResponse();
    }
}