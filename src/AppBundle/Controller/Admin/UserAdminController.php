<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace AppBundle\Controller\Admin;

use JMS\Serializer\DeserializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\User\User;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
     * @Route("/admin/users", name="addUser", methods={"POST"})
     */
    public function addUser(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');


        $newUser = $serializer->deserialize(
            $content,
            'AppBundle\Entity\User\User',
            'json',
            DeserializationContext::create()->setGroups(array('create'))
        );

        if ($newUser->getUsername() == "" && $newUser->getUsername() == null) {
            $response = new Response('Es wurde kein Benutzername angegeben!', Response::HTTP_BAD_REQUEST);
            return $response;
        }

        $usernameExists = $this->getDoctrine()->getRepository('AppBundle\Entity\User\User')->findOneBy(array('username' => $newUser->getUsername()));
        if ($usernameExists !== null) {
            $response = new Response("Benutzername existiert schon!", Response::HTTP_BAD_REQUEST);
            return $response;
        }

        if (strlen($newUser->getPassword()) < 4) {
            $response = new Response('Passwort ist zu kurz (min. 4 Zeichen)!', Response::HTTP_BAD_REQUEST);
            return $response;
        }

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


    /**
     * Ändern der Daten eines users
     *
     * @Route("/admin/users/{id}", name="editUser", methods={"POST"})
     */
    public function editUser($id, Request $request)
    {

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $serializer = $this->get('jms_serializer');
        $user = $serializer->deserialize(
            $content,
            'AppBundle\Entity\User\User',
            'json',
            DeserializationContext::create()->setGroups(array('update'))
        );

        if ($user->getId() != $id) {
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
     * @Route("/admin/users/{id}", name="deleteUser", methods={"DELETE"})
     */
    public
    function deleteUser(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $user = $this->getDoctrine()->getRepository('AppBundle\Entity\User\User')->find($id);

        if ($user != null) {
            $em->remove($user);
            $em->flush();

            return new Response();
        }

        return new Response("User mit der Id {$id} wurde nicht gefunden!", Response::HTTP_NOT_FOUND);
    }


    /**
     * Return all users if no id was given (array) otherwise return one user if found
     *
     * @Route("/admin/users/{id}", defaults={"id"=null}, name="getUsers", methods={"GET"})
     */
    public
    function getUsers($id = null, Request $request)
    {

        if ($id === null) {
            $users = $this->getDoctrine()->getRepository('AppBundle\Entity\User\User')->findBy(
                array(),
                array(
                    'username' => 'ASC'
                )
            );
        } else {
            $users = $this->getDoctrine()->getRepository('AppBundle\Entity\User\User')->findOneBy(
                array(
                    'id' => $id
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
     * @Route("/admin/users/{id}/password", name="changeUserPwdAdmin", methods={"POST"})
     */
    public
    function changeUserPwd(Request $request, UserPasswordEncoderInterface $userPasswordEncoder, $id)
    {
        if (!intval($id) > 0) {
            return new Response('Keine gültige Id!', Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $pwdNew = $content; // 2nd param to get as array
        }

        if (strlen($pwdNew) < 4) {
            return new Response('Passwort ist zu kurz (min. 4 Zeichen)!', Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getDoctrine()->getRepository('AppBundle\Entity\User\User')->find($id);

        if ($user == null) {
            throw $this->createNotFoundException("User mit der Id {$id} wurde nicht gefunden!");
        }

        $encoded = $userPasswordEncoder->encodePassword($user, $pwdNew);
        $user->setPassword($encoded);

        $em->persist($user);
        $em->flush();

        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize(
            $user,
            'json',
            SerializationContext::create()->setGroups(['display'])
        );

        return new Response($response);
    }

}