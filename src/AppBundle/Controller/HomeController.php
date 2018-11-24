<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;
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
     * @Route("/dist/{hashurl}", name="f5redirect", requirements={"hashurl"=".*"})
     */
    public function f5redirectAction(Request $request, $hashurl)
    {
        // readfile("../../../www//dist/index.html");
        $publicResourcesFolderPath = $this->get('kernel')->getRootDir();
        return new BinaryFileResponse($publicResourcesFolderPath . "/../www/dist/index.html");
    }

}
