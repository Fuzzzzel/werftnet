<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;


use AppBundle\Entity\User\User;
use AppBundle\Entity\User\UserRole;
use Tests\AppBundle\DefaultWebTestCase;

class UserTest extends DefaultWebTestCase
{
    public function testUserProperties() {
        $user = new User();

        $username = 'UserTest-Username';
        $user->setUsername($username);
        $this->assertEquals($username, $user->getUsername());

        $password = 'UserTest-Password';
        $user->setPassword($password);
        $this->assertEquals($password, $user->getPassword());

        $role = new UserRole();
        $role->setName('ROLE_USER');
        $user->addRole($role);
        $this->assertEquals(1, count($user->getRealRoles()));
        $this->assertTrue($user->hasRole($role));
        $this->assertFalse($user->hasRole(new UserRole()));
        $this->assertGreaterThan(0, count($role->getUsers()));
        $user->removeRole($role);
        $this->assertEquals(0, count($user->getRoles()));

        $email = 'UserTest-Email';
        $user->setEmail($email);
        $this->assertEquals($email, $user->getEmail());

        $isActive = true;
        $user->setIsActive($isActive);
        $this->assertEquals($isActive, $user->getIsActive());

        // Serialize and deserialize without assertion
        $serialized = $user->serialize();
        $deserialized = $user->unserialize($serialized);
    }

}