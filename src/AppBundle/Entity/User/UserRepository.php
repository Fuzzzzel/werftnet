<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 06.08.2016
 * Time: 23:13
 */

namespace AppBundle\Entity\User;


use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;

class UserRepository extends EntityRepository implements UserLoaderInterface
{
    /**
     * @param string $username
     * @return mixed
     *
     * Funktion für UserLoaderInterface
     * Ein Benutzer kann sich dadurch per Benutzername oder per E-Mail anmelden
     */
    public function loadUserByUsername($username)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username = :username OR u.email = :email')
            ->setParameter('username', $username)
            ->setParameter('email', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findAccountManagers()
    {
        return $this->createQueryBuilder('u')
            ->join('u.roles', 'r', 'WITH', 'r.name = :role')
            ->setParameter('role', 'ROLE_ACCOUNT_MANAGER')
            ->getQuery()
            ->getResult();
    }
}