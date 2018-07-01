<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 31.08.2017
 * Time: 20:21
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationController extends Controller
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
        // will never be executed but needed for interface
    }

    /**
     * @Route("/logout", name="security_logout")
     */
    public function logoutAction()
    {
        // will never be executed but needed for interface
    }

    /**
     * @Route("/get_logged_in_user", name="security_get_logged_in_user", methods={"GET"})
     * @param UserInterface $user
     * @param AuthorizationCheckerInterface $authChecker
     * @return JsonResponse
     */
    public function getLoggedInUserAction(UserInterface $user = null, AuthorizationCheckerInterface $authChecker)
    {
        $response = new \stdClass();

        if ($authChecker->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
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