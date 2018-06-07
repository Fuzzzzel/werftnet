<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return new RedirectResponse("/dist/index.html");
    }

    /**
     * @Route("/login", name="login_page")
     */
    public function loginAction(Request $request)
    {
        return new RedirectResponse("/dist/index.html");
    }

    /**
     * @Route("/dist/{req}", name="f5redirect", requirements={"req"=".*"})
     */
    public function f5redirectAction(Request $request)
    {
        return new RedirectResponse("/dist/index.html");
    }

}
