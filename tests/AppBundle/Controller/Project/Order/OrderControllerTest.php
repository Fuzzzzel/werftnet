<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 14.06.2018
 * Time: 10:59
 */

namespace Tests\AppBundle\Controller\Project\Order;

use http\Env\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\AppBundle\DefaultWebTestCase;
class OrderControllerTest extends DefaultWebTestCase
{
    public function testGetOrderWithoutId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/orders/xyz'
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @throws \Exception
     */
    public function testCreateOrder() {
        $client = $this->getAdminClient();

        $deliveryDate = new \DateTime('now');
        $deliveryDate = $deliveryDate->add(new \DateInterval('PT3H'));
        $deliveryDateJson = $deliveryDate->format('Y-m-d\TH:i');

        $deliveryDateDesired = $deliveryDate->add(new \DateInterval('PT3H'));
        $deliveryDateDesiredJson = $deliveryDateDesired->format('Y-m-d\TH:i');

        $client->request(
            'POST',
            '/orders',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"customer": null, "title": "OrderTest-Title", "description": "Order-Test-Description", "number_of_files": 3, "source_format": "OrderTest-SourceFormat", "target_format": "OrderTest-TargetFormat", "comment": "OrderTest-Comment", "delivery_date_desired":"'.$deliveryDateDesiredJson.'", "delivery_date":"'.$deliveryDateJson.'", "status": null}'
        );

        // Create first order
        $response = $client->getResponse();
        $this->assertJson($response->getContent());
        $orderCreated = json_decode($response->getContent());
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertContains('0001', $orderCreated->order_no);

        // Create second order to test creation of order no
        $client->request(
            'POST',
            '/orders',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"customer": null, "title": "OrderTest-Title", "description": "Order-Test-Description", "number_of_files": 3, "source_format": "OrderTest-SourceFormat", "target_format": "OrderTest-TargetFormat", "comment": "OrderTest-Comment", "delivery_date_desired":"'.$deliveryDateDesiredJson.'", "delivery_date":"'.$deliveryDateJson.'", "status": null}'
        );

        $response = $client->getResponse();
        $this->assertJson($response->getContent());
        $orderCreated = json_decode($response->getContent());
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertContains('0002', $orderCreated->order_no);
        return $orderCreated;
    }


    /**
     * @depends testCreateOrder
     */
    public function testGetOrderById($order) {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/orders/{$order->id}"
        );

        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());
    }

    public function testGetOrderByNonExistingId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/orders/99999"
        );

        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    public function testSearchOrders() {

        // Search order
        $client = $this->getAdminClient();
        $crawler = $client->request('POST', '/orders/search');

        $content = $client->getResponse()->getContent();
        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());
        $this->assertJson($content);
    }

    public function testSearchOrdersBySearchParameters() {

        // Search order
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/search',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"search_text": "Test", "status": {"id": 1}, "customer": {"id": "1"}}'
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
    }

    // ----------- Positions ------------

    /**
     * @depends testCreateOrder
     */
    public function testCreateOrderPosition($order) {
        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($content);
        $position1 = json_decode($content);
        $this->assertEquals(1, $position1->position_number);

        // Create second Position
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($content);
        $position2 = json_decode($content);
        $this->assertTrue($position1->position_number === $position2->position_number - 1);


        return array('orderPosition' => $position2, 'order' => $order);
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testCreateOrderPositionWithNonExistingOrderId($orderPositionAndOrderId) {
        $orderPosition = $orderPositionAndOrderId['orderPosition'];
        $order = $orderPositionAndOrderId['order'];

        $client = $this->getAdminClient();
        $client->request(
            'POST',
            "/orders/99999/positions/{$orderPosition->id}",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );

        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testEditOrderPositionWithWrongOrderId($orderPositionAndOrderId) {
        $orderPosition = $orderPositionAndOrderId['orderPosition'];
        $order = $orderPositionAndOrderId['order'];
        $wrongOrderId = $order->id - 1;

        $client = $this->getAdminClient();
        $client->request(
            'POST',
            "/orders/{$wrongOrderId}/positions/{$orderPosition->id}",
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($orderPosition)
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testGetOrderPositionById($orderPositionAndOrderId) {
        $orderPosition = $orderPositionAndOrderId['orderPosition'];
        $order = $orderPositionAndOrderId['order'];

        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/orders/{$order->id}/positions/{$orderPosition->id}"
        );

        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());
        $this->assertJson($client->getResponse()->getContent());
    }

    public function testGetOrderPositionWithoutOrderId() {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            '/orders/xyz/positions/abc'
        );

        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrder
     */
    public function testGetOrderPositionWithoutOrderPositionId($order) {
        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/orders/{$order->id}/positions/abc"
        );

        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testGetOrderPositionWithWrongOrderId($orderPositionAndOrderId) {
        $orderPosition = $orderPositionAndOrderId['orderPosition'];
        $wrongOrderId = $orderPositionAndOrderId['order']->id + 1;

        $client = $this->getAdminClient();
        $client->request(
            'GET',
            "/orders/{$wrongOrderId}/positions/{$orderPosition->id}"
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    // ------------ OrderTask - BEGIN ------------------

    /**
     * @depends testCreateOrderPosition
     */
    public function testCreateOrderTask($orderPositionAndOrder) {
        $orderPosition = $orderPositionAndOrder['orderPosition'];
        $order = $orderPositionAndOrder['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($content);
        $orderTask = json_decode($content);
        $this->assertGreaterThan(0,$orderTask->id);
        $firstTaskId = $orderTask->id;

        // Create second Task
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($content);

        $orderTask = json_decode($content);
        $this->assertGreaterThan($firstTaskId, $orderTask->id);

        return array('order' => $order, 'orderPosition' => $orderPosition, 'orderTask' => $orderTask);
    }

    /**
     * @depends testCreateOrderTask
     */
    public function testGetOrderTask($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'GET',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks/' . $orderTask->id
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertJson($content);
    }

    /**
     * @depends testCreateOrderTask
     */
    public function testGetOrderTaskWithNonExistingId($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'GET',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks/99999'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderTask
     */
    public function testEditOrderTaskWithNonExistingPositionId($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions/99999/tasks/' . $orderTask->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{}'

        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderTask
     */
    public function testEditOrderTaskWithWrongPositionId($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/' . $order->id . '/positions/99999/tasks/' . $orderTask->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($orderTask)

        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderTask
     */
    public function testEditOrderTaskWithNonExistingOrWrongOrderId($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'POST',
            '/orders/99999/positions/' . $orderPosition->id . '/tasks/' . $orderTask->id,
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode($orderTask)
        );
        $content = $client->getResponse()->getContent();
        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }


    /**
     * @depends testCreateOrderTask
     */
    public function testDeleteOrderTaskWithNonExistingId($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks/99999'
        );
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }


    /**
     * @depends testCreateOrderTask
     */
    public function testDeleteOrderTask($orderPositionAndTask) {
        $orderTask = $orderPositionAndTask['orderTask'];
        $orderPosition = $orderPositionAndTask['orderPosition'];
        $order = $orderPositionAndTask['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id . '/tasks/' . $orderTask->id
        );
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    // ------------ OrderTask - END ------------------


    /**
     * @depends testCreateOrderPosition
     */
    public function testDeleteOrderPositionWithWrongCustomerId($orderPositionAndOrder) {
        $orderPosition = $orderPositionAndOrder['orderPosition'];
        $wrongOrderId = $orderPositionAndOrder['order']->id + 1;

        $client = $this->getAdminClient();
        $client->request(
            'DELETE',
            "/orders/{$wrongOrderId}/positions/{$orderPosition->id}"
        );

        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testDeleteNonExistentOrderPosition($orderPositionAndOrder) {
        $orderPosition = $orderPositionAndOrder['orderPosition'];
        $order = $orderPositionAndOrder['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            "/orders/{$order->id}/positions/99999"
        );
        $this->assertEquals(Response::HTTP_NOT_FOUND, $client->getResponse()->getStatusCode());
    }

    /**
     * @depends testCreateOrderPosition
     */
    public function testDeleteOrderPosition($orderPositionAndOrder) {
        $orderPosition = $orderPositionAndOrder['orderPosition'];
        $order = $orderPositionAndOrder['order'];

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/orders/' . $order->id . '/positions/' . $orderPosition->id
        );
        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());
        $this->assertJson($client->getResponse()->getContent());
    }


    /**
     * @depends testCreateOrder
     */
    public function testDeleteOrder($order) {

        $client = $this->getAdminClient();
        $crawler = $client->request(
            'DELETE',
            '/orders/' . $order->id
        );
        $this->assertJson($client->getResponse()->getContent());
    }
}