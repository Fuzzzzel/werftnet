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

class SimpleEntityControllerTest extends DefaultWebTestCase
{
    public function testCreateAndUpdateSimpleEntity()
    {
        $client = $this->getAdminClient();

        // Create simple entity item
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

        // Update simple entity item
        $newItem = json_decode($responseBody);
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool/' . $newItem->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": "TestCreateSimpleEntity-Edited"}'
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($client->getResponse()->getContent());
        return $newItem;
    }

    public function testCreateDuplicateItem()
    {
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateSimpleEntityDuplicate"}'
        );
        $responseBody = $client->getResponse()->getContent();
        $this->assertJson($responseBody);

        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"newItemName": "TestCreateSimpleEntityDuplicate"}'
        );
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    public function testUpdateNonExistentItem()
    {

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool/99999',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": "TestCreateSimpleEntityDuplicate"}'
        );
        $response = $client->getResponse();
        $this->assertEquals(404, $response->getStatusCode());
    }

    /**
     * @depends testCreateAndUpdateSimpleEntity
     */
    public function testUpdateDuplicateItemName($existingItem)
    {
        $client = $this->getAdminClient();

        // Fetch item from db
        $crawler = $client->request(
            'GET',
            '/admin/simple_entity/CatTool/' . $existingItem->id
        );
        $response = $client->getResponse();
        $this->assertEquals(200, $response->getStatusCode());// Try to update duplicate item

        // Try to update duplicate item
        $crawler = $client->request(
            'POST',
            '/admin/simple_entity/CatTool/' . $existingItem->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"itemNewName": "TestCreateSimpleEntityDuplicate"}'
        );
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
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

        // Delete item
        $crawler = $client->request(
            'DELETE',
            '/admin/simple_entity/CatTool/' . $idToDelete
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        // Fetch simple entity again and make sure the deleted item is gone
        $crawler = $client->request('GET', '/admin/simple_entity/CatTool/' . $idToDelete);
        $this->assertEquals(404, $client->getResponse()->getStatusCode());

        // Delete item a second time
        $crawler = $client->request(
            'DELETE',
            '/admin/simple_entity/CatTool/' . $idToDelete
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    public function testDeleteSimpleEntityTwice()
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