<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 06.08.2016
 * Time: 23:28
 */

namespace AppBundle\EventListener;


use AppBundle\Entity\User;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;

class UserRoleSetter
{
    public function prePersist(LifecycleEventArgs $args) {
        $obj = $args->getObject();
        $om = $args->getObjectManager();

        if($obj instanceof User) {
            // Get role "ROLE_USER"
            $userRole = $om->getRepository('AppBundle:User\UserRole')->findOneBy(array('name' => 'ROLE_USER'));
            if(!$obj->hasRole($userRole)) {
                $obj->addRole($userRole);
            }
        }
    }
}