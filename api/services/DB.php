<?php

namespace services;
include '../../../sharkweek.php'; // Lives outside repo / webroot

use mysqli;

class DB
{
    // For local development
    //     public $servername = 'localhost';
    //     public $username = 'root';
    //     public $password = '';
    //     public $database = 'react_php';
    
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    unset($servername, $username, $password, $database);

    public function database()
    {
        // Making connection
        // local development:
            //$conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
        $conn = mysqli_connect($servername, $username, $password, $database);
        unset($servername, $username, $password, $database);
        
        // Checking connection
        if($conn->connect_error)
        {
            die("Connection failed ".$conn->connect_error);
        }

        return $conn;
    }
}
