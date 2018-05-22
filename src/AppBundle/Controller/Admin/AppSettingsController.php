<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 22.05.2018
 * Time: 01:46
 */

namespace AppBundle\Controller\Admin;


use AppBundle\Service\AppSettingsService;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class AppSettingsController extends Controller
{
    /**
     * @Method("GET")
     * @Route("/admin/settings")
     */
    public function getAppSettings(AppSettingsService $appSettingsService) {
        $settings = $appSettingsService->getSettings();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($settings, 'json', SerializationContext::create()->setGroups(['display'])->enableMaxDepthChecks());

        return new Response($response);
    }

    /**
     * @Method("POST")
     * @Route("/admin/settings/imprint")
     */
    public function setImprint(Request $request, AppSettingsService $appSettingsService) {
        $params = null;

        $content = $request->getContent();

        if (!empty($content)) {
            $params = json_decode($content); // 2nd param to get as array
        }

        $settings = $appSettingsService->getSettings();
        $settings->setImprint($params->imprint);

        $appSettingsService->saveSettings($settings);

        return new JsonResponse();
    }
}