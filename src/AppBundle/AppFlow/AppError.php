<?php
/**
 * Created by PhpStorm.
 * User: Fuzzzzel
 * Date: 10.10.2017
 * Time: 22:45
 */

namespace AppBundle\AppFlow;

use JMS\Serializer\Annotation as JMS;

class AppError
{

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     */
    protected $type;

    /**
     * @JMS\Type("string")
     * @JMS\Groups({"display"})
     */
    protected $message;

    function __construct($type, $message)
    {
        $this->setType($type);
        $this->setMessage($message);
    }

    function setType($type)
    {
        $this->type = $type;
    }

    function getType()
    {
        return $this->type;
    }

    function setMessage($message)
    {
        $this->message = $message;
    }

    function getMessage()
    {
        return $this->message;
    }
}