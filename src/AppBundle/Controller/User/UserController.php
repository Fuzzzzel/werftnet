<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace AppBundle\Controller\User;

use AppBundle\AppFlow\AppError;
use AppBundle\AppFlow\ErrorResponse;
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
 * Class UserController
 * @package AppBundle\Controller
 *
 */
class UserController extends Controller
{

    /**
     * Ändern des eigenen Passworts
     *
     * @Method("POST")
     * @Route("/user/change_pwd", name="change_pwd")
     */
    public function changeUserPwdAction(Request $request)
    {
        $response = new JsonResponse();
        $pwdOld = null;
        $pwdNew = null;

        $em = $this->getDoctrine()->getManager();

        // Daten aus Request in Objekte überführen
        $content = $request->getContent();

        $params = null;

        if (!empty($content)) {
            $params = json_decode($content, true); // 2nd param to get as array
        }

        if (!isset($params['pwd_old'])) {
            $response->setStatusCode(422);
            $response->setContent('Altes Passwort fehlr!');
            return $response;
        } else {
            $pwdOld = $params['pwd_old'];
        }

        if (!isset($params['pwd_new'])) {
            $response->setStatusCode(422);
            $response->setContent('Neues Passwort fehlr!');
            return $response;
        } else {
            $pwdNew = $params['pwd_new'];
            if(strlen($pwdNew) < 4) {
                $response->setStatusCode(422);
                $response->setContent('Neues Passwort muss mindestens 4 Zeichen haben!');
                return $response;
            }
        }

        $user = $this->getUser();
        $factory = $this->get('security.encoder_factory');
        $encoder = $factory->getEncoder($user);

        if (!$encoder->isPasswordValid($user->getPassword(), $pwdOld, $user->getSalt())) {
            $response->setStatusCode(422);
            $response->setContent('Altes Passwort nicht korrekt!');
            return $response;
        }

        $encoded = $encoder->encodePassword($pwdNew, $user->getSalt());
        $user->setPassword($encoded);

        $em->persist($user);
        $em->flush();

        return new JsonResponse($user);
    }

}