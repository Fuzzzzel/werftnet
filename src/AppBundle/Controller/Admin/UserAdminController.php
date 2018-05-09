<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace AppBundle\Controller\Admin;

use AppBundle\AppFlow\ErrorResponse;
use AppBundle\AppFlow\AppError;
use JMS\Serializer\DeserializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\User;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;

/**
 * Class DefaultsController
 * @package AppBundle\Controller
 *
 */
class UserAdminController extends Controller
{

    /**
     * Anlegen eines neuen Users
     * Benötigt: username, password (, email noch nicht)
     *
     * @Method("POST")
     * @Route("/admin/users", name="addUser")
     */
    public function addUser(Request $request)
    {
        if ($request->getMethod() != 'POST') {
            return null;
        }

        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');


        $newUser = $serializer->deserialize(
            $content,
            'AppBundle\Entity\User',
            'json',
            DeserializationContext::create()->setGroups(array('create'))
        );


        $usernameExists = $this->getDoctrine()->getRepository('AppBundle\Entity\User')->findOneBy(array('username' => $newUser->getUsername()));
        if ($usernameExists !== null) {
            $response = new \stdClass();
            $response->error = 'Benutzername existiert schon!';
            return new JsonResponse($response);
        }

        if (strlen($newUser->getPassword()) < 4) {
            $response = new \stdClass();
            $response->error = 'Passwort ist zu kurz (min. 4 Zeichen)!';
            return new JsonResponse($response);
        }


        if (
            ($newUser->getUsername() != "" && $newUser->getUsername() != null) &&
            ($newUser->getPassword() != "" && $newUser->getPassword() != null)
        ) {
            $encoder = $this->container->get('security.password_encoder');
            $encoded = $encoder->encodePassword($newUser, $newUser->getPassword());
            $newUser->setPassword($encoded);

            $em->persist($newUser);
            $em->flush();

            $response = $serializer->serialize(
                $newUser,
                'json',
                SerializationContext::create()->setGroups(['display'])
            );

            return new Response($response);
        }

        $response = new \stdClass();
        $response->error = "User konnte nicht angelegt werden";
        return new JsonResponse($response);
    }


    /**
     * Ändern der Daten eines users
     *
     * @Method("POST")
     * @Route("/admin/users/{id}", name="editUser")
     */
    public
    function editUser($id, Request $request)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $user = $serializer->deserialize(
            $content,
            'AppBundle\Entity\User',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        if($user->getId() != $id) {
            return new Response('Id von User stimmt nicht mit Route überein!', Response::HTTP_BAD_REQUEST);
        }

        // EntityManager laden
        $em = $this->getDoctrine()->getManager();

        $em->persist($user);
        $em->flush();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($user, 'json', SerializationContext::create()->setGroups(['display']));

        return new Response($response);
    }


    /**
     * Löschen eines Users anhand der ID
     *
     * @Route("/admin/deleteUser", name="deleteUser")
     */
    public
    function deleteUser(Request $request)
    {
        if ($request->getMethod() != 'POST') {
            return null;
        }

        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }

        if (isset($params['user_id'])) {
            $user = $this->getDoctrine()->getRepository('AppBundle\Entity\User')->find($params['user_id']);

            if ($user != null) {
                $em->remove($user);
                $em->flush();

                return new Response("User wurde gelöscht");
            }
        }

        return new Response("User wurde nicht gelöscht");
    }


    /**
     * Alle user ausgeben
     *
     * @Method("GET")
     * @Route("/admin/users/{id}", name="getAllUsers")
     */
    public
    function getAllUsers($id = null, Request $request)
    {

        if ($id === null) {
            $users = $this->getDoctrine()->getRepository('AppBundle\Entity\User')->findAll();
        } else {
            $users = $this->getDoctrine()->getRepository('AppBundle\Entity\User')->findBy(
                array(
                    'id' => $id
                ),
                array(
                    'username' => 'ASC'
                )
            );
        }

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize(
            $users,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );

        return new Response($response);
    }

    /**
     * Ändern des Passwort eines Users anhand der ID
     *
     * @Method("POST")
     * @Route("/admin/users/{id}/password", name="changeUserPwdAdmin")
     */
    public
    function changeUserPwd($id, Request $request)
    {
        $response = new JsonResponse();
        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $pwdNew = json_decode($content, true); // 2nd param to get as array
        }

        if ($id > 0 && strlen($pwdNew) > 0) {

            if (strlen($pwdNew) < 4) {
                $response->setContent('Passwort ist zu kurz (min. 4 Zeichen)!');
                $response->setStatusCode(Response::HTTP_BAD_REQUEST);
                return $response;
            }

            $user = $this->getDoctrine()->getRepository('AppBundle\Entity\User')->find($id);

            if ($user != null) {
                $factory = $this->get('security.encoder_factory');
                $encoder = $factory->getEncoder($user);

                $encoded = $encoder->encodePassword($pwdNew, $user->getSalt());
                $user->setPassword($encoded);

                $em->persist($user);
                $em->flush();

                $response->setMessage("Passwort wurde erfolgreich geändert.");

                $response->setStatusCode(Response::HTTP_OK);
                return $response;
            }
        }

        return $response;
    }

}