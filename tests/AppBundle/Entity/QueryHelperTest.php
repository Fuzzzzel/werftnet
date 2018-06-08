<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 16:31
 */

namespace Tests\AppBundle\Controller;

use AppBundle\Entity\QueryHelper;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class QueryHelperTest extends TestCase
{
    public function testGetFullEntityNameFreelancer() {
        $fullEntityName = QueryHelper::getFullEntityName('FreelancerStatus');
        $this->assertTrue(strpos($fullEntityName, 'Freelancer\\') === 0);
    }

    public function testGetFullEntityNameCommon() {
        $fullEntityName = QueryHelper::getFullEntityName('Sector');
        $this->assertTrue(strpos($fullEntityName, 'Common\\') === 0);
    }

}