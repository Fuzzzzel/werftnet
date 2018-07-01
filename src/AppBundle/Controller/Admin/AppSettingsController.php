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
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AppSettingsController extends Controller
{
    /**
     * @Route("/admin/settings", methods={"GET"})
     */
    public function getAppSettings(AppSettingsService $appSettingsService)
    {
        $settings = $appSettingsService->getSettings();

        $serializer = SerializerBuilder::create()->build();
        $response = $serializer->serialize($settings, 'json', SerializationContext::create()->setGroups(['display'])->enableMaxDepthChecks());

        return new Response($response);
    }

    /**
     * @Route("/admin/settings/imprint", methods={"GET"})
     */
    public function getImprint(Request $request, AppSettingsService $appSettingsService)
    {
        $settings = $appSettingsService->getSettings();
        $imprint = $settings->getImprint();

        if(!is_string($imprint)) {
            $imprint = '';
        }

        return new JsonResponse($imprint);
    }

    /**
     * @Route("/admin/settings/imprint", methods={"POST"})
     */
    public function setImprint(Request $request, AppSettingsService $appSettingsService, AuthorizationCheckerInterface $authChecker)
    {
        $isAdmin = $authChecker->isGranted('ROLE_ADMIN');
        if (!$isAdmin) {
            throw $this->createAccessDeniedException('You are not allowed to edit the Imprint!');
        }

        $params = null;

        $content = $request->getContent();

        if (!empty($content)) {
            $params = json_decode($content); // 2nd param to get as array
        }

        $settings = $appSettingsService->getSettings();
        $settings->setImprint($params->imprint);

        $appSettingsService->saveSettings($settings);

        return new JsonResponse($settings->getImprint());
    }
}