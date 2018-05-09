<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 10.10.2017
 * Time: 22:56
 */

namespace AppBundle\AppFlow;


use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Annotation as JMS;

class ErrorResponse extends Response
{
    /**
     * @JMS\Type("stdClass")
     * @JMS\Groups({"display"})
     */
    protected $data;

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     */
    protected $message;

    /**
     * @JMS\Type("array<AppBundle\AppFlow\AppError>")
     * @JMS\Groups({"display"})
     */
    protected $errors;

    public function __construct()
    {
        parent::__construct();
        $this->data = new \stdClass();
        $this->message = "";
        $this->errors = array();
    }

    public function addError(AppError $error) {
        $this->errors[] = $error;
        $this->updateContent();
    }

    public function getErrors() {
        return $this->errors;
    }

    public function setData(\stdClass $data) {
        $this->data = $data;
        $this->updateContent();
    }

    public function getData() {
        return $this->data;
    }

    public function getMessage() {
        return $this->message;
    }

    public function setMessage($message) {
        $this->message = $message;
        $this->updateContent();
    }

    public function updateContent() {
        $serializer = SerializerBuilder::create()->build();
        $content = $serializer->serialize($this, 'json', SerializationContext::create()->setGroups(['display']));
        $this->setContent($content);
    }
}