<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 31.08.2017
 * Time: 20:21
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthenticatinController extends Controller
{
    // login user
    // logout user
    // Ask for logged in user (in session)
    // update own profile - later

    /**
     * @Route("/login_check", name="security_login_check")
     */
    public function loginCheckAction()
    {
        // will never be executed
        $i = 1;
    }

    /**
     * @Route("/logout", name="security_logout")
     */
    public function logoutAction()
    {
        // will never be executed
        $i = 1;
    }

    /**
     * @Route("/get_logged_in_user", name="security_get_logged_in_user")
     */
    public function getLoggedInUserAction()
    {

        $user = $this->get('security.token_storage')->getToken()->getUser();
        $auth_checker = $this->get('security.authorization_checker');

        $response = new \stdClass();

        if ($auth_checker->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            $response->id = $user->getId();
            $response->username = $user->getUsername();
            $roles = $user->getRoles();
            $response->roles = array();
            foreach ($roles as $role) {
                $response->roles[] = $role;
            }
        }

        return new JsonResponse($response);
    }
}