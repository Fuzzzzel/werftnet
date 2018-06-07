<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 19:53
 */

namespace Tests\AppBundle\Controller\Admin;


use Tests\AppBundle\DefaultWebTestCase;
use Symfony\Component\HttpFoundation\Response;

class TwoLevelEntityControllerTest extends DefaultWebTestCase
{

    public function testFindNonExistentItem()
    {
        // Create main item
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'GET',
            '/admin/two_level_entity/sector/99999',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateTwoLevelEntity"}'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    public function testCreateAndUpdateMainItem()
    {
        // Create main item
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/two_level_entity/sector',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateTwoLevelEntity"}'
        );
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        $newItem = json_decode($responseBody);

        // Create main item a second time
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/two_level_entity/sector',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateTwoLevelEntity"}'
        );
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());

        return $newItem;
    }

    /**
     * @depends testCreateAndUpdateMainItem
     */
    public function testSubItemOperations($newItem)
    {
        $client = $this->getAdminClient();

        // Create subitem
        $crawler = $client->request(
            'POST',
            "/admin/two_level_entity/sector/{$newItem->id}/sub_items",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateTwoLevelEntity-SubItem"}'
        );

        $response = $client->getResponse()->getContent();
        $this->assertJson($response);
        $subItem = json_decode($response);


        // Edit subitem
        $crawler = $client->request(
            'POST',
            "/admin/two_level_entity/sector/{$newItem->id}/sub_items/{$subItem->id}",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": "TestCreateTwoLevelEntity-SubItem-Edited"}'
        );
        $response = $client->getResponse()->getContent();
        $this->assertJson($response);

        // Fail edit subitem because of empty name
        $crawler = $client->request(
            'POST',
            "/admin/two_level_entity/sector/{$newItem->id}/sub_items/{$subItem->id}",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": ""}'
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());

        // Make main item
        $crawler = $client->request(
            'POST',
            "/admin/makeMainItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "' . $subItem->id . '"}'
        );
        $response = $client->getResponse()->getContent();
        $this->assertJson($response);

        // Make main item fail
        $crawler = $client->request(
            'POST',
            "/admin/makeMainItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": 99999}'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());

        // Make sub item
        $crawler = $client->request(
            'POST',
            "/admin/addAsSubItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "' . $subItem->id . '",  "mainItemId": "' . $newItem->id . '"}'
        );
        $response = $client->getResponse()->getContent();
        $this->assertJson($response);

        // Make sub item fail because of id
        $crawler = $client->request(
            'POST',
            "/admin/addAsSubItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": 99999,  "mainItemId": 99999}'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());

        // Make sub item fail because new main item is sub item itself
        $crawler = $client->request(
            'POST',
            "/admin/addAsSubItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "' . $newItem->id . '",  "mainItemId": "' . $newItem->id . '"}'
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());

        // Make sub item fail because new main is a sub item
        $crawler = $client->request(
            'POST',
            "/admin/addAsSubItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "' . $newItem->id . '",  "mainItemId": "' . $subItem->id . '"}'
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    public function testUpdateNonExistentItem()
    {
        // Fetch two level entity collection
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/two_level_entity/sector/99999',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": "UpdateNonExistentItem"}'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    public function testFetchTwoLevelEntityCollection()
    {
        // Fetch two level entity collection
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/admin/two_level_entity/sector');
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);
    }

    /**
     * @depends testCreateAndUpdateMainItem
     */
    public function testFetchAndDeleteTwoLevelEntity($itemToDelete)
    {
        // Fetch two level entity to delete
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/admin/two_level_entity/sector/' . $itemToDelete->id);
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        $response = json_decode($responseBody);
        $mainItemToDelete = $response;

        // Delete item while still subitems
        $crawler = $client->request(
            'DELETE',
            "/admin/two_level_entity/sector/{$mainItemToDelete->id}"
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());

        // Delete sub item
        $crawler = $client->request(
            'DELETE',
            "/admin/two_level_entity/sector/{$mainItemToDelete->id}/sub_items/{$mainItemToDelete->sub_items[0]->id}"
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        // Delete main item
        // Delete item while still subitems
        $crawler = $client->request(
            'DELETE',
            "/admin/two_level_entity/sector/{$mainItemToDelete->id}"
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        // Delete non existing item
        $crawler = $client->request(
            'DELETE',
            "/admin/two_level_entity/sector/99999"
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());

    }

    private function findItemById($arr, $id)
    {
        foreach ($arr as $item) {
            if ($id == $item->id) {
                return true;
            }
        }
        return false;
    }

}