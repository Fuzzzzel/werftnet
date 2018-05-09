<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 17.07.2016
 * Time: 21:56
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use AppBundle\Entity\User\UserRole;
use JMS\Serializer\Annotation as JMS;

/**
 * Class User
 * @package AppBundle\Entity
 *
 * !!! Eventlistener OnBeforePersist adds the USER_ROLE to each new User !!!
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @ORM\Table(name="User")
 */
class User implements AdvancedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @JMS\Type("integer")
     * @JMS\Groups({"display", "update"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=25, unique=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "create"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=64)
     * @JMS\Type("string")
     * @JMS\Groups({"create"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @JMS\Type("string")
     * @JMS\Groups({"display", "update", "create"})
     */
    private $email;


    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User\UserRole", inversedBy="users")
     * @ORM\JoinTable(name="users_roles")
     * @JMS\Type("ArrayCollection<AppBundle\Entity\User\UserRole>")
     * @JMS\Groups({"display", "update", "create"})
     */
    private $roles;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $lastLoginAttempt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $failedLoginAttempts;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    public function __construct()
    {
        $this->isActive = true;
        $this->failedLoginAttempts = 0;

        $this->roles = new ArrayCollection();
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return null
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        $roles = array();
        foreach ($this->roles as $role) {
            array_push($roles, $role->getName());
        }

        return $roles;
    }

    /**
     * @return ArrayCollection
     */
    public function getRealRoles() {
        return $this->roles;
    }

    public function hasRole($role)
    {
        if (in_array($role, $this->roles->toArray())) {
            return true;
        }

        return false;
    }

    /**
     * @param \AppBundle\Entity\User\UserRole $role
     *
     * @return User
     */
    public function addRole(\AppBundle\Entity\User\UserRole $role)
    {
        $this->roles[] = $role;
        $role->addUser($this);

        return $this;
    }

    /**
     * @param \AppBundle\Entity\User\UserRole $role
     */
    public function removeRole(\AppBundle\Entity\User\UserRole $role)
    {
        $this->roles->removeElement($role);
    }


    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param boolean $isActive
     *
     * @return User
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * @param boolean $lastLoginAttempt
     *
     * @return User
     */
    public function setLastLoginAttempt($lastLoginAttempt)
    {
        $this->lastLoginAttempt = $lastLoginAttempt;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getLastLoginAttempt()
    {
        return $this->lastLoginAttempt;
    }

    /**
     * @param boolean $failedLoginAttempts
     *
     * @return User
     */
    public function setFailedLoginAttempts($failedLoginAttempts)
    {
        $this->failedLoginAttempts = $failedLoginAttempts;

        return $this;
    }

    /**
     * @return Integer
     */
    public function getFailedLoginAttempts()
    {
        return $this->failedLoginAttempts;
    }

    public function isAccountNonExpired()
    {
        // Accounts do not expire
        return true;
    }

    public function isAccountNonLocked()
    {
        // TODO: Implement isAccountNonLocked() method.
        return $this->getFailedLoginAttempts() < 3 || !$this->requestWithinLoginDelay();
    }

    public function isCredentialsNonExpired()
    {
        // Credentials do not expire
        return true;
    }

    public function isEnabled()
    {
        // TODO: Implement isEnabled() method.
        return true;
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function requestWithinLoginDelay() {
        $loginAttemptTime = new \DateTime();
        return $loginAttemptTime->getTimeStamp() - $this->getLastLoginAttempt()->getTimeStamp() < 60;
    }

    public function serialize()
    {
        return serialize(
            array(
                $this->id,
                $this->username,
                $this->password,
                $this->isActive,
            )
        );
    }

    public function unserialize($serialized)
    {
        list(
            $this->id,
            $this->username,
            $this->password,
            $this->isActive,
            ) = unserialize($serialized);
    }

}
