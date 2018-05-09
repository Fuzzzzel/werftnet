<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 07.09.2017
 * Time: 21:53
 */

namespace AppBundle\EventListener;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

class LogoutSuccessHandler implements LogoutSuccessHandlerInterface
{
    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * Constructor
     * @param EntityManager $em
     */
    public function __construct()
    {

    }

    /**
     * Do post logout stuff
     */
    public function onLogoutSuccess(Request $request)
    {
        /*
        $user = $authToken->getUser();

        // do stuff with the user object...
        $this->em->flush();
        */
        $response = new \stdClass();
        $response->message = "Ausgeloggt";

        return new JsonResponse($response);
    }
}