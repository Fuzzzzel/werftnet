<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 22.05.2018
 * Time: 00:39
 */

namespace AppBundle\Service;


use AppBundle\Entity\Settings\AppSettings;
use Doctrine\ORM\EntityManagerInterface;

class AppSettingsService
{
    public function __construct(EntityManagerInterface $em)
    {

        $this->em = $em;

    }

    public function getSettings()
    {
        $repo = $this->em->getRepository(AppSettings::class);
        $settings = $repo->find(1);
        if (!$settings) {
            $settings = new AppSettings();
            $this->em->persist($settings);
            $this->em->flush();
        }

        return $settings;
    }

    public function saveSettings($newSettings)
    {
        $settings = $this->getSettings();
        $settings->setImprint($newSettings->getImprint());

        $this->em->persist($settings);
        $this->em->flush();

        return $settings;
    }
}