<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 06.08.2016
 * Time: 22:48
 */

namespace AppBundle\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\Mapping as ORM;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Entity\Freelancer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AdminStuffController extends Controller
{

    /**
     * @Route("admin/test", name="admin/test")
     */
    function adminTest() {
        return new Response("Seite konnte aufgerufen werden");
    }

}