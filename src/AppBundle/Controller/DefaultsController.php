<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 16.07.2016
 * Time: 19:32
 */

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

use AppBundle\Entity\Common\Language;
use AppBundle\Entity\Common\LanguageSub;
use AppBundle\Entity\SimpleEntity;
use AppBundle\Controller\Admin\SimpleEntityController;
use AppBundle\Entity\Common\Sector;

/**
 * Class DefaultsController
 * @package AppBundle\Controller
 *
 */
class DefaultsController extends Controller
{
    /**
     * @Route("/getDefaults", name="getDefaults")
     * @Method("GET")
     */
    public function returnDefaults()
    {
        $defaultData = new \stdClass();
        $defaultData->yes_no_in_progress = $this->getSimpleEntity('Common\\YesNoInProgress');
        $defaultData->anrede = $this->getSimpleEntity('Common\\Anrede');
        $defaultData->country = $this->getSimpleEntity('Common\\Country');
        $defaultData->sectors = $this->getTwoLevelEntity('Common\\Sector');
        $defaultData->languages = $this->getTwoLevelEntity('Common\\Language');
        $defaultData->services = $this->getSimpleEntity('Common\\Service');
        $defaultData->price_units = $this->getSimpleEntity('Common\\PriceUnit');
        $defaultData->currency = $this->getSimpleEntity('Common\\Currency');
        $defaultData->cat_tools = $this->getSimpleEntity('Common\\CatTool');
        $defaultData->freelancer_payment_types = $this->getSimpleEntity('Freelancer\\FreelancerPaymentType');
        $defaultData->freelancer_invoicing_types = $this->getSimpleEntity('Freelancer\\FreelancerInvoicingType');
        $defaultData->freelancer_rating = $this->getSimpleEntity('Freelancer\\FreelancerRating');
        $defaultData->freelancer_status = $this->getSimpleEntity('Freelancer\\FreelancerStatus');
        $defaultData->customer_origin = $this->getSimpleEntity('Customer\\CustomerOrigin');
        $defaultData->customer_potential = $this->getSimpleEntity('Customer\\CustomerPotential');
        $defaultData->customer_status = $this->getSimpleEntity('Customer\\CustomerStatus');
        $defaultData->user_roles = $this->getSimpleEntity('User\\UserRole');
        $defaultData->account_managers = $this->getAccountManagers();

        return new JsonResponse($defaultData);
    }

    /**
     * @Route("/getUserRoles", name="getUserRoles")
     * @Method("GET")
     */
    public function getUserRoles()
    {
        $userRoles = new \stdClass();
        $userRoles = $this->getSimpleEntity('User\\UserRole');

        return new JsonResponse($userRoles);
    }

    /**
     * @param $entityName
     * @return \stdClass
     *
     * !! Duplicated in SimpleEntityController --> Move to service?!
     */
    public function getSimpleEntity($entityName)
    {
        $simpleEntities = new \stdClass;
        $classname = "\\AppBundle\\Entity\\" . $entityName;

        $simpleEntities->values = $this->getDoctrine()
            ->getRepository($classname)
            ->findBy(
                array(),
                array('name' => 'ASC')
            );

        $simpleObj = new $classname();
        $simpleEntities->display_name = $simpleObj->getDisplayName();

        return $simpleEntities;
    }

    /**
     * @param $entityName
     * @return \stdClass
     *
     * !! Duplicated in TwoLevelEntityController --> Move to service?!
     */
    public function getTwoLevelEntity($entityName)
    {
        $items = new \stdClass;
        $itemsTemp = array();
        $classname = "AppBundle\\Entity\\" . $entityName;

        $repo = $this->getDoctrine()
            ->getRepository($classname);
        $itemsFromDb = $repo->findAllItems();

        // Subsprachen den Hauptsprachen zuordnen
        foreach ($itemsFromDb as $lang) {
            $itemObj = new \stdClass();
            $itemObj->id = $lang->getId();
            $itemObj->name = $lang->getName();

            if ($lang->isMainItem()) {
                // Add main language to result array
                $itemsTemp[$lang->getId()] = $itemObj;
            } else {
                // Add sub language to main
                $itemsTemp[$lang->getMainItem()->getId()]->sub_items[] = $itemObj;
            }
        }

        $dummyItem = new $classname();
        $items->display_name = $dummyItem->getDisplayName();
        foreach ($itemsTemp as $completeItem) {
            $items->values[] = $completeItem;
        }

        return $items;
    }


    /**
     * @return \stdClass
     *
     */
    public function getAccountManagers()
    {
        $accountManagers = new \stdClass;
        $classname = "\\AppBundle\\Entity\\User\\User";

        $ams = $this->getDoctrine()
            ->getRepository($classname)
            ->findAccountManagers();

        $accountManagers->values = array();
        foreach ($ams as $am) {
            $temp = new \StdClass;
            $temp->id = $am->getId();
            $temp->username = $am->getUsername();
            $accountManagers->values[] = $temp;
        }

        $accountManagers->display_name = "Accountmgr.";

        return $accountManagers;
    }
}