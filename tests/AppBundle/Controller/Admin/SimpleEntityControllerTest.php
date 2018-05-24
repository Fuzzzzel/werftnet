<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 21.05.2018
 * Time: 19:53
 */

namespace Tests\AppBundle\Controller\Admin;


use Tests\AppBundle\DefaultWebTestCase;

class SimpleEntityControllerTest extends DefaultWebTestCase
{
    public function testCreateAndUpdateSimpleEntity()
    {

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateSimpleEntity"}'
        );
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        $newItem = json_decode($responseBody);
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool/' . $newItem->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemEditedName": "TestCreateSimpleEntity-Edited"}'
        );
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testFetchAndDeleteSimpleEntity()
    {
        // Fetch simple entity
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/admin/simple_entity/CatTool');
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        // Choose item to delete and test that in array
        $response = json_decode($responseBody);
        $itemsBeforeDelete = $response->values;
        $idToDelete = $itemsBeforeDelete[0]->id;

        $itemFoundBefore = $this->findItemById($itemsBeforeDelete, $idToDelete);
        $this->assertTrue($itemFoundBefore);

        // Delete item
        $crawler = $client->request(
            'DELETE',
            '/admin/simple_entity/CatTool/' . $idToDelete
        );
        $this->assertJson($client->getResponse()->getContent());


        // Fetch simple entity again and make sure the deleted item is gone
        $client = $this->getAdminClient();
        $crawler = $client->request('GET', '/admin/simple_entity/CatTool');
        $responseBody = $client->getResponse()->getContent();
        $response = json_decode($responseBody);
        $itemsAfterDelete = $response->values;
        $itemFoundAfter = $this->findItemById($itemsAfterDelete, $idToDelete);
        $this->assertFalse($itemFoundAfter);
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