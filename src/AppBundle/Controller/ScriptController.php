<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ScriptController extends Controller
{
    /**
     * @Route("/feedback", name="feedback")
     */
    public function feedbackAction(Request $request)
    {
        return new RedirectResponse('https://trello.com/b/owYPOSaW/werftnet-10');
    }

    /**
     * @Route("/admin/update", name="update")
     */
    public function updateAction(Request $request)
    {
        $old_path = getcwd();
        chdir('/home/werftnet/');
        $output = shell_exec('bash update_symfony');
        chdir($old_path);
        return new Response("<p>Skript update_symfony wurde ausgeführt!:</p>" . nl2br($output));
    }
}
