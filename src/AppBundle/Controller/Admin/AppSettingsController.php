<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 22.05.2018
 * Time: 01:46
 */

namespace AppBundle\Controller\Admin;


use AppBundle\Service\AppSettingsService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

        return new JsonResponse($settings);
    }

    /**
     * @Method("GET")
     * @Route("/admin/settings/imprint")
     */
    public function getImprint(AppSettingsService $appSettingsService) {

        $settings = $appSettingsService->getSettings();

        return new JsonResponse($settings->getImprint());
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