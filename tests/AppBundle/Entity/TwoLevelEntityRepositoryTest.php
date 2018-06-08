<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 08.06.2018
 * Time: 21:31
 */

class TwoLevelEntityRepositoryTest extends \Symfony\Bundle\FrameworkBundle\Test\KernelTestCase
{
    private $em;

    protected function setUp()
    {
        $kernel = self::bootKernel();

        $this->em = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    /**
     * Should fail if no id passed
     */
    public function testFindAllSubItems()
    {
        $this->expectException(InvalidArgumentException::class);
        $subItems = $this->em
            ->getRepository(\AppBundle\Entity\Common\Language::class)
            ->findAllSubItems(null);
    }
}