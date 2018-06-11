<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 22:04
 */

namespace AppBundle\Entity\User;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\User\User;
use AppBundle\Entity\SimpleEntity;

/**
 * Class UserRole
 * @package AppBundle\Entity\User
 *
 * @ORM\Entity
 * @ORM\Table(name="UserRole")
 */
class UserRole extends SimpleEntity
{
    public function getDisplayName() {
        return "Rolle Benutzer";
    }

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User\User", mappedBy="roles")
     */
    private $users;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add user
     *
     * @param User $user
     *
     * @return UserRole
     */
    public function addUser(User $user)
    {
        $this->users[] = $user;

        return $this;
    }

    /**
     * Remove user
     *
     * @param User $user
     */
    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }
}
