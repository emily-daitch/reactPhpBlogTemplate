<?php

namespace services;

use mysqli;

class DB
{
    public function database()
    {
        // To hijack this DB connector for local development, comment the line below and uncomment the following block
        //global $servername, $username, $password, $database;
        ///*
        $username = 'root';
        $password = '';
        $servername = 'localhost';
        $database = "click";
        //*/
        // Making connection
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
