<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 31.08.2017
 * Time: 22:28
 */

namespace AppBundle\EventListener;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Doctrine\ORM\EntityManager;
use Twig\Error\Error;

class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    private $router = null;
    private $session = null;
    private $em = null;

    /**
     * Constructor
     *
     * @author    Joe Sexton <joe@webtipblog.com>
     * @param    RouterInterface $router
     * @param    Session $session
     */
    public function __construct(RouterInterface $router, SessionInterface $session)
    {
        $this->router = $router;
        $this->session = $session;
    }

    public function setEntityManager(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * onAuthenticationSuccess
     *
     * @author    Joe Sexton <joe@webtipblog.com>
     * @param    Request $request
     * @param    TokenInterface $token
     * @return    JsonResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $user = new \stdClass();

        $userLoggedIn = $token->getUser();
        $userLoggedIn->setFailedLoginAttempts(0);

        $this->em->persist($userLoggedIn);
        $this->em->flush();


        $user->id = $userLoggedIn->getId();
        $user->username = $userLoggedIn->getUsername();
        $user->roles = $userLoggedIn->getRoles();

        return new JsonResponse($user);
    }

    /**
     * onAuthenticationFailure
     *
     * @author    Joe Sexton <joe@webtipblog.com>
     * @param    Request $request
     * @param    AuthenticationException $exception
     * @return    Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $response = new Response();
        $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
        $response->setContent("Es ist ein Fehler beim Login aufgetreten");

        $user = null;

        $repo = $this->em->getRepository('AppBundle:User');
        $user = $repo->findOneByUsername($exception->getToken()->getUsername());

        if ($user !== null) {
            $loginAttemptTime = new \DateTime();
            $user->setFailedLoginAttempts($user->getFailedLoginAttempts() + 1);

            if ($user->getFailedLoginAttempts() >= 3 && ($user->requestWithinLoginDelay())) {
                $response->setContent("Sie haben 3 Mal oder öfter das falsche Passwort eingegeben.Der nächste Loginversuch ist erst in 1 Minute möglich.");
            }

            $user->setLastLoginAttempt($loginAttemptTime);
            $this->em->persist($user);
            $this->em->flush();
        }

        return $response;
    }
}