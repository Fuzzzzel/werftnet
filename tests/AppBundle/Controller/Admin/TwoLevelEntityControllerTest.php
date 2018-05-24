<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 19:53
 */

namespace Tests\AppBundle\Controller\Admin;


use Tests\AppBundle\DefaultWebTestCase;

class TwoLevelEntityControllerTest extends DefaultWebTestCase
{
    public function testCreateAndUpdateTwoLevelEntity()
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

        // Make main item
        $crawler = $client->request(
            'POST',
            "/admin/makeMainItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "'. $subItem->id . '"}'
        );
        $response = $client->getResponse()->getContent();
        $this->assertJson($response);

        // Make sub item
        $crawler = $client->request(
            'POST',
            "/admin/addAsSubItem",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"entityName": "Sector", "itemId": "'. $subItem->id . '",  "itemMainId": "'. $newItem->id . '"}'
        );
        $response = $client->getResponse()->getContent();
        $this->assertJson($response);
    }

    public function testFetchAndDeleteTwoLevelEntity()
    {
        // Fetch simple entity
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/admin/two_level_entity/sector');
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        // Choose item to delete and test that in array
        $response = json_decode($responseBody);
        $itemsBeforeDelete = $response->values;
        $mainItemToDelete = $itemsBeforeDelete[0];

        $url = '';
        if(sizeof($mainItemToDelete->sub_items) > 0) {
            $url = "/admin/two_level_entity/sector/{$mainItemToDelete->id}/sub_items/{$mainItemToDelete->sub_items[0]->id}";
        } else {
            $url = "/admin/two_level_entity/sector/{$mainItemToDelete->id}";
        }

        // Delete item
        $crawler = $client->request(
            'DELETE',
            $url
        );
        $this->assertJson($client->getResponse()->getContent());
    }

    private function findItemById($arr, $id) {
        foreach($arr as $item) {
            if ($id == $item->id) {
                return true;
            }
        }
        return false;
    }

}