<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\User\User;
use AppBundle\Entity\User\UserRole;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class UserFixtures implements FixtureInterface, ContainerAwareInterface
{

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        // ToDo: Refactor to test each property separately
        $userRolesInDb = $manager->getRepository(UserRole::class)->findAll();
        if(count($userRolesInDb) > 0) {
            return;
        }

        // USER
        // StandardRollen
        $roleUser = new UserRole();
        $roleUser->setName("ROLE_USER");
        $manager->persist($roleUser);

        $roleAdmin = new UserRole();
        $roleAdmin->setName("ROLE_ADMIN");
        $manager->persist($roleAdmin);

        $roleAccountManager = new UserRole();
        $roleAccountManager->setName("ROLE_ACCOUNT_MANAGER");
        $manager->persist($roleAccountManager);
        $manager->flush();


        // Testuser für den anfänglichen Admin anlegen
        $user = new User();
        $user->setUsername('admin');
        $user->setEmail('admin@some.domain.com');

        $plainPassword = 'admin';
        $encoder = $this->container->get('security.password_encoder');
        $encoded = $encoder->encodePassword($user, $plainPassword);
        $user->setPassword($encoded);
        $user->addRole($roleAdmin);

        $manager->persist($user);
        $manager->flush();

        // Normalen Testuser (als Account Manager) anlegen
        $user = new User();
        $user->setUsername('user');
        $user->setEmail('user@some.domain.com');

        $plainPassword = 'user';
        $encoder = $this->container->get('security.password_encoder');
        $encoded = $encoder->encodePassword($user, $plainPassword);
        $user->setPassword($encoded);
        $user->addRole($roleUser);
        $user->addRole($roleAccountManager);

        $manager->persist($user);
        $manager->flush();
    }
}